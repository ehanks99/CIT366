import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  private documents: Document[] = [];
  maxDocumentId: number;

  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    // this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  fetchDocuments() {
    return this.http.get<Document[]>("https://cms-project-73398.firebaseio.com/documents.json")
      .pipe(tap(documents => {
          this.documents = documents;
        }
      )
    );
  }

  startFetchingDocuments() {
    this.http.get<Document[]>("https://cms-project-73398.firebaseio.com/documents.json")
      .subscribe(
        // success function
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            } else if (a.name < b.name) {
              return -1;
            } else {
              return 0;
            }
          });

          // emit the next document list change event
          this.documentListChangedEvent.next(this.documents.slice());
        },
        // error function
        (error: any) => {
          console.log(error);
        }
      );
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
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
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
    
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
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
    
    // this.documentListChangedEvent.next(this.documents.slice());
    this.storeDocuments();
  }

  storeDocuments() {
    const stringDocuments = JSON.stringify(this.documents);
    let header = new HttpHeaders({'content-type': 'application/json'});
    this.http.put(
      "https://cms-project-73398.firebaseio.com/documents.json",
      stringDocuments,
      {headers: header}
    ).subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
  }
}
