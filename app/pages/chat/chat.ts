import {Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {NavController, Alert, Content} from 'ionic-angular';
import {SocketIo} from './../../providers/socket-io/socket-io';
import {User} from './../../models/user';
import {Ucfirst} from './../../pipes/ucfirst';

@Component({
  templateUrl: 'build/pages/chat/chat.html',
  pipes: [Ucfirst]
})
export class ChatPage {

  @ViewChild(Content) content: Content;

  private messages: Array<any>;
  private users: Array<any>;
  private socket: any;
  public newMessage: string;
  public ui: any;
  public segmentSelected:string = 'chat';

  constructor(private nav: NavController, private socketIo: SocketIo, private user: User, private ref: ChangeDetectorRef) {
    this.messages = [];
    this.socket = socketIo.getSocket();
    this.ui = {
      message: {
        messages: 'Carregando mensagens...',
        users: 'Carregando usuários...'
      }
    };

    // listener of events
    this.socket.on('startData', (data) => {
      this.users = data.users;
      this.messages = data.messages;
      this.ref.detectChanges();

      if (this.users.length <= 0) {
        this.ui.message.users = 'Nenhum usuário online.';
      }
      if (this.messages.length <= 0) {
        this.ui.message.messages = 'Nenhuma mensagem enviada...';
      }
      setTimeout(() => {
        this.scrollBottom();
      }, 500);
    });

    this.socket.on('message', (data) => {
      this.messages.push(data);
      this.ref.detectChanges();
      this.scrollBottom();
    });

    this.socket.on('user', (user) => {
      this.users.push(user);
      this.ref.detectChanges();
    });

    this.socket.on('userOff', (userOff) => {
      this.users = this.users.filter((user) => {
        return user.name != userOff.name;
      });
      this.ref.detectChanges();
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
                this.socket.emit('user', {
                  name: this.user.getUserName()
                });
            }
          }
        }
      ]
    });
    this.nav.present(prompt);
  }

}
