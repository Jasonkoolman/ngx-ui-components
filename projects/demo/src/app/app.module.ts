import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home.component';
import { UidComponentsModule } from './components/components.module';
import { UiModule } from './ui.module';
import { routes } from './app-routes';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always'
    }),
    UiModule,
    UidComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
