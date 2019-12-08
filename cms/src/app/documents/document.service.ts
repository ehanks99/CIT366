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

  constructor(private http: HttpClient) { }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  sortAndSend() {
    this.documents.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

    // emit the next document list change event
    this.documentListChangedEvent.next(this.documents.slice());
  }
  
  fetchDocuments() {
    return this.http.get<{ message: string, documents: Document[] }>("http://localhost:3000/api/documents")
      .pipe(tap(documentInfo => {
          this.documents = documentInfo.documents;
        }
      )
    );
  }

  startFetchingDocuments() {
    this.http.get<{ message: string, documents: Document[] }>("http://localhost:3000/api/documents")
      .subscribe(
        // success function
        (documentInfo) => {
          this.documents = documentInfo.documents;

          this.sortAndSend();
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
    if (!document) {
      return;
    }

    this.http.delete<{message: string}>("http://localhost:3000/api/documents/" + document.documentId)
      .subscribe(
        (returnInfo) => {
          let pos = this.documents.indexOf(document);
          this.documents.splice(pos, 1);
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    // make sure id of the new document has something (empty string)
    newDocument.documentId = "";
    const strDocument = JSON.stringify(newDocument);

    this.http.post<{message: string, document: Document}>("http://localhost:3000/api/documents", strDocument, {headers: headers})
      .subscribe(
        (documentInfo) => {
          // we want to use the returned document because it has the correct "id" field filled in (from the database)
          this.documents.push(documentInfo.document);
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    // // set the id of the new document to the id of the old document
    // newDocument.documentId = originalDocument.documentId;
    // newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });

    newDocument.documentId = originalDocument.documentId;
    const strDocument = JSON.stringify(newDocument);

    this.http.put<{ message: string, document: Document }>("http://localhost:3000/api/documents/" + originalDocument.documentId,
                    strDocument,
                    {headers: headers})
      .subscribe(
        (documentInfo) => {
          // don't need to use the returned document here because we already have the id saved from
          // the original document, but it's fine if we do use it
          this.documents[pos] = documentInfo.document;
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
