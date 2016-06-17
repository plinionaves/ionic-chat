import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ChatPage} from './pages/chat/chat';
import {SocketIo} from './providers/socket-io/socket-io';
import {User} from './models/user';


@Component({
  templateUrl: 'build/app.html',
  providers: [SocketIo, User]
})
export class MyApp {

  chat: any = ChatPage;

  rootPage: any = this.chat;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.rootPage = page;
  }

}

ionicBootstrap(MyApp);
