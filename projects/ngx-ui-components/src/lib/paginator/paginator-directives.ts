import { Directive } from "@angular/core";

/**
 * A directive to match the 'ellipsis' link template.
 */
@Directive({
  selector: 'ng-template[ui-paginator-ellipsis], ng-template[uiPaginatorEllipsis]'
})
export class PaginatorEllipsis {
  constructor() {}
}

/**
 * A directive to match the 'first' link template.
 */
@Directive({
  selector: 'ng-template[ui-paginator-first], ng-template[uiPaginatorFirst]'
})
export class PaginatorFirst {
  constructor() {}
}

/**
 * A directive to match the 'prev' link template.
 */
@Directive({
  selector: 'ng-template[ui-paginator-prev], ng-template[uiPaginatorPrev]'
})
export class PaginatorPrev {}

/**
 * A directive to match the 'next' link template.
 */
@Directive({
  selector: 'ng-template[ui-paginator-next], ng-template[uiPaginatorNext]'
})
export class PaginatorNext {}

/**
 * A directive to match the 'last' link template.
 */
@Directive({
  selector: 'ng-template[ui-paginator-last], ng-template[uiPaginatorLast]'
})
export class PaginatorLast {}
