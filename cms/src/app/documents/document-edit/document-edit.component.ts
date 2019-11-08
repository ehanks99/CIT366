import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) documentForm: NgForm;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  subscription: Subscription;

  constructor(private documentService: DocumentService,
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

        this.originalDocument = this.documentService.getDocument(id);
        if (!this.originalDocument) {
          return;
        }

        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
      }
    );
  }

  onSubmit() {
    const values = this.documentForm.value;
    
    const newDocument = new Document('', values.name, values.description, values.url, null);

    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["/documents"]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
