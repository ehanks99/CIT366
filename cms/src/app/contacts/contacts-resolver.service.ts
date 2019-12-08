import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsResolverService implements Resolve<Contact[]> {
  constructor(private contactService: ContactService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const contacts = this.contactService.getContacts();
  
    if (contacts.length === 0) {
      return this.contactService.fetchContacts();
    } else {
      return contacts;
    }
  }
}