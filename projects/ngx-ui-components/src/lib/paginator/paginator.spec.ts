import { TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { PaginatorModule } from './paginator.module';

// function createComponent<T>(component: Type<T>, providers: Provider[] = []): ComponentFixture<T> {
//   TestBed.configureTestingModule({
//     imports: [PaginatorModule],
//     declarations: [component],
//     providers
//   }).compileComponents();
//
//   const fixture = TestBed.createComponent(component);
//   fixture.detectChanges();
//   return fixture;
// }

describe('Paginator', () => {

  /** Class testing */
  describe('Class logic', () => {

    let paginator: PaginatorComponent;

    beforeEach(() => {
      paginator = new PaginatorComponent();
    });

    it('should calculate the total amount of pages (default perPage)', () => {
      paginator.length = 100;
      paginator.ngOnChanges({});
      expect(paginator.pageCount).toEqual(10);
    });

    it('should calculate the total amount of pages (custom perPage)', () => {
      paginator.length = 100;
      paginator.perPage = 5;
      paginator.ngOnChanges({});
      expect(paginator.pageCount).toEqual(20);

      paginator.length = 200;
      paginator.ngOnChanges({});
      expect(paginator.pageCount).toEqual(40);

      paginator.perPage = 12;
      paginator.ngOnChanges({});
      expect(paginator.pageCount).toEqual(17);
    });

    it('should calculate the page numbers (default range)', (done) => {
      paginator.length = 100;
      paginator.ngOnChanges({});
      paginator.pageNumbers$.subscribe(numbers => {
        expect(numbers.length).toEqual(5);
        done();
      })
    });

    it('should calculate the page numbers (custom range)', (done) => {
      paginator.length = 100;
      paginator.range = 3;
      paginator.ngOnChanges({});
      paginator.pageNumbers$.subscribe(numbers => {
        expect(numbers.length).toEqual(7);
        done();
      })
    });

  });

  /** DOM testing */
  describe('UI logic', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PaginatorComponent],
        imports: [PaginatorModule]
      });
    });

  });

});
