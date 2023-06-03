import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AutoSuggestComponent } from './auto-suggest/auto-suggest.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoSuggestComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
