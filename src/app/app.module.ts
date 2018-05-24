import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AlertModule} from 'ngx-bootstrap';

import {AppComponent} from './app.component';
import {ApiService} from './shared/api.service';
import {PaginatorComponent} from './shared/paginator/paginator.component';
import { AddNewWordComponent } from './add-new-word/add-new-word.component';
import { WordsTableComponent } from './words-table/words-table.component';
import {FirebaseService} from './shared/firebase.service';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

export const firebaseConfig = {
  apiKey: 'AIzaSyBUMeEqc_FZg2UAnWHVR9mH6fqpt9UIzEE',
  authDomain: 'testfirebaseproject-39110.firebaseapp.com',
  databaseURL: 'https://testfirebaseproject-39110.firebaseio.com',
  projectId: 'testfirebaseproject-39110',
  storageBucket: 'testfirebaseproject-39110.appspot.com',
  messagingSenderId: '966082447044'
};

@NgModule({
  declarations: [
    AppComponent,
    PaginatorComponent,
    AddNewWordComponent,
    WordsTableComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [ApiService, FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
