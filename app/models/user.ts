import {Injectable} from '@angular/core';


@Injectable()
export class User {

  private userName: string;

  constructor() {
  }

  getUserName() {
    return this.userName;
  }

  setUserName(userName: string) {
    this.userName = userName;
  }

}
