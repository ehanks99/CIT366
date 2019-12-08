export class Message {
    constructor(
        // public _id: string,
        public messageId: string,
        public subject: string,
        public msgText: string,
        public sender: string
    ) { }
}