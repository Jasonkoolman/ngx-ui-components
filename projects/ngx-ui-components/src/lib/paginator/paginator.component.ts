import {
  ChangeDetectionStrategy,
  Component, ContentChild,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output, SimpleChanges, TemplateRef
} from '@angular/core';
import { Observable, range, Subject } from "rxjs";
import { filter, map, takeUntil, toArray } from "rxjs/operators";
import { PageEvent } from "./paginator.interface";
import { PaginatorFirst, PaginatorPrev, PaginatorNext, PaginatorLast, PaginatorEllipsis } from "./paginator-directives";

@Component({
  selector: 'ui-paginator',
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnChanges, OnDestroy {
  /** The current page number */
  @Input() page = 1;

  /** The total numbers of items to be paged */
  @Input() length: number;

  /** The numbers of items per page */
  @Input() perPage = 10;

  /** The range size of items to display */
  @Input() range = 2;

  /** Whether to disable the paginator */
  @Input() disabled = false;

  /** Whether to show ellipsis */
  @Input() showEllipsis = false;

  /** Whether to show boundary first and last page links */
  @Input() showBoundaryLinks = false;

  /** Emits whenever the page number changes */
  @Output() pageChange = new EventEmitter<PageEvent>();

  /** Notifies when the component is destroyed */
  private destroyed$ = new Subject<void>();

  /** Padding to be applied to the start and length of the range */
  private rangePadding = [0, 0];

  /** The total number of pages */
  pageCount: number;

  /** Observable containing the page numbers to be displayed */
  pageNumbers$: Observable<number[]>;

  @HostBinding('class') classes = 'ui-paginator';
  @HostBinding('attr.role') attrRole = 'navigation';

  @ContentChild(PaginatorFirst, { read: TemplateRef }) tplFirstRef;
  @ContentChild(PaginatorPrev, { read: TemplateRef }) tplPrevRef;
  @ContentChild(PaginatorNext, { read: TemplateRef }) tplNextRef;
  @ContentChild(PaginatorLast, { read: TemplateRef }) tplLastRef;
  @ContentChild(PaginatorEllipsis, { read: TemplateRef }) tplEllipsisRef;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getPages();
  }

  /**
   * Get the page numbers.
   */
  getPages() {
    this.pageCount = this.getPageCount();

    // If we have a range of 3, we’ll show at most 7 pages, for example if the current
    // page is 10, we’ll show pages 7, 8, 9, 10, 11, 12 and 13. That means that for our
    // range, the length will be this.range * 2 + 1. As the start of our range we use
    // -this.range, so that the range will actually contain the relative offset towards
    // our current page, for example -3, -2, -1, 0, 1, 2 and 3.
    const length = this.range * 2 + 1;

    this.rangePadding = this.getRangePadding(length);
    this.pageNumbers$ = range(this.rangeStart, this.rangeLength).pipe(
      takeUntil(this.destroyed$),
      map(offset => this.page + offset),
      filter(page => this.isPageNumber(page)),
      toArray()
    );
  }

  /**
   * Calculates the padding to be applied on the range.
   *
   * Pages that would've been shown on the left side are added to the right - and
   * the other way around. This way we always show an equal amount of pages.
   */
  getRangePadding(length: number) {
    const lastPage = this.page + this.range;
    const padding = [0, 0];

    if ((lastPage - this.pageCount) > 0) {
      padding[0] = lastPage - this.pageCount;
    }
    if (lastPage < length) {
      padding[1] = length - lastPage;
    }

    return padding;
  }

  /**
   * The start of range.
   */
  get rangeStart(): number {
    return (-this.range) - this.rangePadding[0];
  }

  /**
   * The length of the range.
   */
  get rangeLength(): number {
    return (this.range * 2 + 1) + this.rangePadding[1];
  }

  /**
   * Gets the total number of pages.
   */
  getPageCount(): number {
    return Math.ceil(
      Math.max(this.length, 1) / Math.max(this.perPage, 1)
    );
  }


  /**
   * Determine whether the given page number is valid.
   */
  isPageNumber(page: number): boolean {
    return page > 0 && page <= this.pageCount;
  }

  /**
   * Selects the given page number.
   */
  selectPage(page: number, event) {
    event.preventDefault();
    const previousPage = this.page;
    this.page = page;
    this.getPages();
    this.emitPageEvent(previousPage);
  }

  /**
   * Whether the paginator should show ellipsis for previous pages.
   */
  get hasPrevEllipsis() {
    return this.showEllipsis && (this.page - this.range - this.rangePadding[0]) > 1;
  }

  /**
   * Whether the paginator should show ellipsis for next pages.
   */
  get hasNextEllipsis() {
    return this.showEllipsis && (this.page + this.range + this.rangePadding[1]) < this.pageCount;
  }

  /**
   * Whether the previous links should be disabled.
   */
  get prevDisabled() {
    return this.disabled || this.page === 1;
  }

  /**
   * Whether the next links should be disabled.
   */
  get nextDisabled() {
    return this.disabled || this.page === this.pageCount;
  }

  /**
   * Invoked when the component is destroyed.
   */
  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  /**
   * Emits an event notifying that a change of the paginator's properties has been triggered.
   */
  private emitPageEvent(previousPage: number) {
    this.pageChange.emit({
      page: this.page,
      previousPage,
      pageCount: this.pageCount
    });
  }

}
