export class Document {
    constructor(
        // public _id: string,
        public documentId: string,
        public name: string,
        public description: string,
        public url: string,
        public children: Document[] = null
    ) {  }
}