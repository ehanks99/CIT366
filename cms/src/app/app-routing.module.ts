import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DocumentsComponent } from './documents/documents.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentStartComponent } from './documents/document-start/document-start.component';
import { ContactStartComponent } from './contacts/contact-start/contact-start.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactsResolverService } from './contacts/contacts-resolver.service';
import { DocumentsResolverService } from './documents/documents-resolver.service';

// the const must be above the "@NgModule"
const appRoutes: Routes = [
  { path: '', redirectTo: 'documents', pathMatch: 'full' },
  { path: 'documents', component: DocumentsComponent, children: [
    { path: '', component: DocumentStartComponent, pathMatch: 'full' },
    { path: 'new', component: DocumentEditComponent },
    { path: ':id', component: DocumentDetailComponent, resolve: [DocumentsResolverService] },
    { path: ':id/edit', component: DocumentEditComponent, resolve: [DocumentsResolverService] }
  ] },
  // messages needs the contact list, so let's make sure the contact list gets loaded if this url is selected
  { path: 'messages', component: MessageListComponent, resolve: [ContactsResolverService] },
  { path: 'contacts', component: ContactsComponent, children: [
    { path: '', component: ContactStartComponent, pathMatch: 'full' },
    { path: 'new', component:  ContactEditComponent },
    { path: ':id', component: ContactDetailComponent, resolve: [ContactsResolverService] },
    { path: ':id/edit', component: ContactEditComponent, resolve: [ContactsResolverService] }
  ] }
]; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
