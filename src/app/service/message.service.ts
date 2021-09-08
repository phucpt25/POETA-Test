import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messsage: any ={
    mess: '',
    kindMess: 'alert-info'
  }
  constructor() { }

  add(data: any){
    this.messsage.mess = data.mess;
    this.messsage.kindMess = data.kindMess;
  }

}
