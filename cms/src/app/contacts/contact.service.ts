import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  private contacts: Contact[] = [];
  maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.contactId === id) {
        return contact;
      }
    }

    return null;
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }
  
  getMaxId(): number {
    let maxId = 0;

    for (let contact of this.contacts) {
      let currentId = +contact.contactId;

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addContact(newContact: Contact) {
    if (newContact === null) {
      return;
    }

    this.maxContactId++;
    newContact.contactId = (this.maxContactId).toString();
    this.contacts.push(newContact);
    
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact === null || newContact === null) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.contactId = originalContact.contactId;
    this.contacts[pos] = newContact;
    
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
