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
    HttpModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
