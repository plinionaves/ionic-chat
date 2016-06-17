import {Injectable} from '@angular/core';


@Injectable()
export class SocketIo {

  private socket:any;

  constructor() {
    this.socket = io.connect('https://dynamic-app-test-plinionaves.c9users.io:8080');
  }

  getSocket() {
    return this.socket;
  }

}
