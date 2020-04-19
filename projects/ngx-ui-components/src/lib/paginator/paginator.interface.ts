export interface PageEvent {
  /** The current page number */
  page: number;

  /** The previously selected page number */
  previousPage: number;

  /** The total numbers of pages */
  pageCount: number;
}
