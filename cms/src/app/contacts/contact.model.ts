import { Injectable } from '@angular/core';

@Injectable()
export class Contact {
    constructor(
        // public _id: string,
        public contactId: string, 
        public name: string, 
        public email: string, 
        public phone: string, 
        public imageUrl: string, 
        public group: Contact[] = null // set default to be null
    ) { }
}