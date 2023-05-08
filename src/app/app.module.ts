import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormComponent } from './form.component';
import { UploadComponent } from './upload.component';
import { ListComponent } from './list.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
