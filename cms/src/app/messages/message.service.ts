import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];

  constructor(private http: HttpClient) { }

  initMessages() {
    this.http.get<{message: String, messages: Message[]}>("http://localhost:3000/api/messages")
    .subscribe(
      // success function
      (messageInfo) => {
        this.messages = messageInfo.messages;

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
    if (!message) {
      return;
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    message.messageId = "";
    const strMessage = JSON.stringify(message);

    this.http.post<{title: string, message: Message}>("http://localhost:3000/api/messages", strMessage, {headers: headers})
      .subscribe(
        (messageInfo) => {
          // we want to use the returned message because it has the correct "id" field filled in (from the database)
          this.messages.push(messageInfo.message);
          this.messageChangeEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
