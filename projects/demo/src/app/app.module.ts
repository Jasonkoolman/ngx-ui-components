import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app-routes';
import { UidComponentsModule } from "./components/components.module";
import { UiModule } from "./ui.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    UiModule,
    UidComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
