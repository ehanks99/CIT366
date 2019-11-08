import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) contactForm: NgForm;
  originalContact: Contact;
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact: boolean = false;

  subscription: Subscription;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];

        if (!id) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(id);
        if (!this.originalContact) {
          return;
        }

        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.contact.group) {
          this.groupContacts = this.contact.group.slice();
          this.hasGroup = true;
        }
      }
    );
  }

  onSubmit() {
    const values = this.contactForm.value;
    console.log(this.groupContacts);
    const newContact = new Contact('', values.name, values.email, values.phone, values.imageUrl, this.groupContacts);

    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["/contacts"]);
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) { // newContact has no value?
      return true;
    }

    // if we're in the "add" contact route, our contact and contact id will be null - so do an additional check
    if (this.contact && newContact.contactId === this.contact.contactId) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.contactId === this.groupContacts[i].contactId) {
        return true;
      }
    }

    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;

    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }

    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
    this.hasGroup = true;
  }

  onRemoveItem(index: number) {
    // If contact is outside of the array bounds
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }

    this.groupContacts.splice(index, 1);
    this.invalidGroupContact = false;

    if (this.groupContacts.length > 0) {
      this.hasGroup = true;
    } else {
      this.hasGroup = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
