import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Document } from './document.model';
import { DocumentService } from './document.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsResolverService implements Resolve<Document[]> {
  constructor(private documentService: DocumentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const documents = this.documentService.getDocuments();
  
    if (documents.length === 0) {
      return this.documentService.fetchDocuments();
    } else {
      return documents;
    }
  }
}