import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UidDemoComponent } from './demo/demo.component';



@NgModule({
  declarations: [
    UidDemoComponent
  ],
  exports: [
    UidDemoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UidSharedModule { }
