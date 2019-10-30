import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  private documents: Document[] = [];
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (let document of this.documents) {
      if (document.documentId === id) {
        return document;
      }
    }

    return null;
  }

  deleteDocument(document: Document) {
    if (document === null) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }

    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
  }

  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents) {
      let currentId = +document.documentId;

      if (currentId > maxId) {
        maxId = currentId;
      }
    }

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null) {
      return;
    }

    this.maxDocumentId++;
    newDocument.documentId = (this.maxDocumentId).toString();
    this.documents.push(newDocument);
    
    this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (originalDocument === null || newDocument === null) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.documentId = originalDocument.documentId;
    this.documents[pos] = newDocument;
    
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
