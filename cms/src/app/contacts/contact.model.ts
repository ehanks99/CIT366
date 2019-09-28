export class Contact {
    public contactId: number;
    public name: string;
    public email: string;
    public phone: string;
    public imageUrl: string;
    public group:  Contact[];

    constructor(id: number, name: string, email: string, phone: string, imageUrl: string, group: Contact[] = null) {
        this.contactId = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.group = group;
    }
}