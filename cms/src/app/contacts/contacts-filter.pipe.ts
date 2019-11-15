import { Pipe, PipeTransform } from '@angular/core';

import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {
    if (!term || term === ""){
      return contacts;
    }

    let filteredArray: Contact[] = [];
    filteredArray = contacts.filter(
      (contact: Contact) => 
        contact.name.toLowerCase().includes(term.toLowerCase())
    );

    if (filteredArray.length < 1) {
      console.log("empty");
      return contacts;
    }

    console.log(filteredArray[0].name);
    
    return filteredArray;
  }
}
