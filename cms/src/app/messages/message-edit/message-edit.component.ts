import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: false }) subjectRef: ElementRef;
  @ViewChild('msgText', {static: false }) msgTextRef: ElementRef;
  currentSender: string = "101";
  // could maybe try deleting the _id part... see if that works
  // currentSender = new Contact(
  //   "asdfqe24g541hjsdas13",
  //   "101",
  //   "Emily Hanks",
  //   "test@gmail.com",
  //   "",
  //   "222-222-222",
  //   null);

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const msg = new Message("", subject, msgText, this.currentSender);
    this.messageService.addMessage(msg);

    // once we've sent the message, let's clear the input fields
    this.onClear();
  }

  onClear() {
    this.subjectRef.nativeElement.value = "";
    this.msgTextRef.nativeElement.value = "";
  }
}
