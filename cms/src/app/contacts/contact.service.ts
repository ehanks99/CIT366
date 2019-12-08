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

  constructor(private http: HttpClient) { }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  fetchContacts() {
    return this.http.get<{message: String, contacts: Contact[]}>("http://localhost:3000/api/contacts")
      .pipe(tap(contactInfo => {
          this.contacts = contactInfo.contacts;
        }
      )
    );
  }

  startFetchingContacts() {
    this.http.get("http://localhost:3000/api/contacts")
    .subscribe(
      // success function
      (returnInfo: {message: String, contacts: Contact[]}) => {
        this.contacts = returnInfo.contacts;

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
    if (!contact) {
      return;
    }
    
    this.http.delete<{message: string}>("http://localhost:3000/api/contacts/" + contact.contactId)
    .subscribe(
      (returnInfo) => {
          let pos = this.contacts.indexOf(contact);
          this.contacts.splice(pos, 1);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    newContact.contactId = "";
    const strContact = JSON.stringify(newContact);

    this.http.post<{message: string, contact: Contact}>("http://localhost:3000/api/contacts", strContact, {headers: headers})
      .subscribe(
        (contactInfo) => {
          // we want to use the returned contact because it has the correct "id" field filled in (from the database)
          this.contacts.push(contactInfo.contact);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    newContact.contactId = originalContact.contactId;
    const strContact = JSON.stringify(newContact);

    this.http.put<{message: string, contact: Contact}>("http://localhost:3000/api/contacts/" + originalContact.contactId,
                    strContact,
                    {headers: headers})
      .subscribe(
        (contactInfo) => {
          // don't need to use the returned contact here because we already have the id saved from
          // the original contact, but that's fine if we do use it
          this.contacts[pos] = contactInfo.contact;
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
