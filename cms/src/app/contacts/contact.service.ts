import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  private contacts: Contact[] = [];
  maxContactId: number;

  constructor(private http: HttpClient) {
    // this.contacts = MOCKCONTACTS;
    // this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  fetchContacts() {
    return this.http.get<Contact[]>("https://cms-project-73398.firebaseio.com/contacts.json")
      .pipe(tap(contacts => {
          this.contacts = contacts;
        }
      )
    );
  }

  startFetchingContacts() {
    this.http.get<Contact[]>("https://cms-project-73398.firebaseio.com/contacts.json")
    .subscribe(
      // success function
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();

        // emit the next contact list change event
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      // error function
      (error: any) => {
        console.log(error);
      }
    );
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
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }
  
  private getMaxId(): number {
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
    
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
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
    
    // this.contactListChangedEvent.next(this.contacts.slice());
    this.storeContacts();
  }

  storeContacts() {
    const stringContacts = JSON.stringify(this.contacts);
    let header = new HttpHeaders({'content-type': 'application/json'});
    this.http.put(
      "https://cms-project-73398.firebaseio.com/contacts.json",
      stringContacts,
      {headers: header}
    ).subscribe(() => {
      this.contactListChangedEvent.next(this.contacts.slice());
    });
  }
}
