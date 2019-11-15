import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    // this.messages = MOCKMESSAGES;
  }

  initMessages() {
    this.http.get<Message[]>("https://cms-project-73398.firebaseio.com/messages.json")
    .subscribe(
      // success function
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();

        // // emit the next message list change event
        this.messageChangeEvent.next(this.messages.slice());
      },
      // error function
      (error: any) => {
        console.log(error);
      }
    );
  }

  getMessages() {
    return this.messages.slice();
  }

  getMessage(id: string) {
    for (let message of this.messages) {
      if (message.messageId === id) {
        return message;
      }
    }

    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    // this.messageChangeEvent.emit(this.messages.slice());
    this.storeMessages();
  }

  storeMessages() {
    const stringMessages = JSON.stringify(this.messages);
    let header = new HttpHeaders({'content-type': 'application/json'});
    this.http.put(
      "https://cms-project-73398.firebaseio.com/messages.json",
      stringMessages,
      {headers: header}
    ).subscribe(() => {
      this.messageChangeEvent.next(this.messages.slice());
    });
  }

  private getMaxId(): number {
    let maxId = 0;

    for (let message of this.messages) {
      let currentId = +message.messageId;

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }
}
