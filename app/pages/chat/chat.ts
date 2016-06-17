import {Component, ViewChild} from '@angular/core';
import {Content} from 'ionic-angular';
import {NavController, Alert} from 'ionic-angular';
import {SocketIo} from './../../providers/socket-io/socket-io';
import {User} from './../../models/user';

@Component({
  templateUrl: 'build/pages/chat/chat.html'
})
export class ChatPage {

  @ViewChild(Content) content: Content;

  private messages: Array<any>;
  private socket: any;
  newMessage: string;
  view: any;

  constructor(private nav: NavController, private socketIo: SocketIo, private user: User) {
    this.messages = [];
    this.socket = socketIo.getSocket();
    this.view = {
      message: 'Carregando mensagens...'
    };

    // listener of events
    this.socket.on('initialMessages', (data) => {
      this.messages = data.messages;
      if (this.messages.length <= 0) {
        this.view.message = 'Nenhuma mensagem enviada...';
      }
      setTimeout(() => {
        this.scrollBottom();
      }, 500);
    });

    this.socket.on('message', (data) => {
      this.messages.push(data);
      this.scrollBottom();
    });
  }

  scrollBottom() {
    let dimensions = this.content.getContentDimensions();
    this.content.scrollTo(0, dimensions.scrollBottom, 0);
  }

  convertDate(date: string) {
    return new Date(date);
  }

  formatDate(date: string) {
    let d = this.convertDate(date);
    let now = new Date();
    let str = '';
    str += (d.getDate() == now.getDate()) ? 'hoje' : d.getDate() + '/' + (d.getMonth()+1) + d.getFullYear();
    str += ' as ' + d.getHours() + ':' + d.getMinutes();
    return str;
  }

  sendMessage() {
    console.log('message', this.newMessage);
    if (this.user.getUserName()) {
      if (this.newMessage) {
        this.socket.emit('message', {
          sender: this.user.getUserName(),
          message: this.newMessage
        });
        this.newMessage = '';
      }
    } else {
      this.getUserName();
    }
    console.log('clicou');
  }

  getUserName() {
    let prompt = Alert.create({
      title: 'Identificação',
      message: 'Qual seu nome?',
      inputs: [
        {
          name: 'username',
          placeholder: 'Seu primeiro nome',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'OK',
          handler: data => {
            let name = data.username;
            if (name) {
                this.user.setUserName(name);
                this.sendMessage();
            }
          }
        }
      ]
    });
    this.nav.present(prompt);
  }

}
