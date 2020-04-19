import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// Demo App
import { AppComponent } from './app.component';
import { routes } from './app-routes';
import { DialogPageComponent } from './pages/dialog/dialog.component';
import { BasicDialogComponent } from './pages/dialog/presets/basic-dialog.component';
import { ConfirmationDialogComponent } from './pages/dialog/presets/confirmation-dialog.component';
import { ExampleComponent } from './components/example/example.component';
import { UiModule } from "./ui.module";


@NgModule({
  declarations: [
    AppComponent,
    DialogPageComponent,
    BasicDialogComponent,
    ConfirmationDialogComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    UiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
