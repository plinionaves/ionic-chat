import {Injectable, Pipe} from '@angular/core';

@Pipe({
  name: 'ucfirst'
})
@Injectable()
export class Ucfirst {

  transform(value, args) {
    return value.charAt(0).toUpperCase() + value.substr(1, value.length).toLowerCase();
  }
}
