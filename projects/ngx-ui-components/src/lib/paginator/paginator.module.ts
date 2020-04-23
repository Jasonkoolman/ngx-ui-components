import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { PaginatorEllipsis, PaginatorFirst, PaginatorLast, PaginatorNext, PaginatorPrev } from './paginator-directives';


@NgModule({
  declarations: [
    PaginatorComponent,
    PaginatorFirst,
    PaginatorPrev,
    PaginatorNext,
    PaginatorLast,
    PaginatorEllipsis
  ],
  exports: [
    PaginatorComponent,
    PaginatorFirst,
    PaginatorPrev,
    PaginatorNext,
    PaginatorLast,
    PaginatorEllipsis
  ],
  imports: [
    CommonModule
  ]
})
export class PaginatorModule {}
