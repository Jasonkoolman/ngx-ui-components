import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { createGenericTestComponent } from '../core/testing/common';
import { PaginatorComponent } from './paginator.component';
import { PaginatorModule } from './paginator.module';

const Selectors = {
  ul: '.paginator-items',
  li: '.paginator-item'
}

function createTestHost(template: string): ComponentFixture<TestComponent> {
  return createGenericTestComponent(TestComponent, template)
}

function expectItems(element: HTMLElement, expectedItems: string[], ellipsis = '...'): void {
  const items = element.querySelectorAll(Selectors.li);

  expect(items.length).toEqual(expectedItems.length);

  expectedItems.forEach((item, i) => {
    // The first character of the expected item may start with either the
    // '+' or '-' character to mark it as active or disabled respectively.
    const state = item.charAt(0);
    const textContent = normalizeText(items[i].textContent);

    if (textContent === ellipsis) {
      expect(items[i]).toHaveCssClass('disabled');
    } else if (state === '+') {
      expect(items[i]).toHaveCssClass('active');
      expect(items[i]).not.toHaveCssClass('disabled');
      expect(items[i].getAttribute('aria-current')).toBe('page');
      expect(textContent).toEqual(item.substr(1));
    } else if (state === '-') {
      expect(items[i]).not.toHaveCssClass('active');
      expect(items[i]).toHaveCssClass('disabled');
      expect(items[i].getAttribute('aria-current')).toBeNull();
      expect(textContent).toEqual(item.substr(1));
    } else {
      expect(items[i]).not.toHaveCssClass('active');
      expect(items[i]).not.toHaveCssClass('disabled');
      expect(items[i].getAttribute('aria-current')).toBeNull();
      expect(textContent).toEqual(item);
    }
  });
}

function normalizeText(text: string | null): string {
  return text === null ? '' : text.replace(/\s+/g, ' ').trim();
}


describe('Paginator', () => {

  describe('Class logic', () => {
    let paginator: PaginatorComponent;

    beforeEach(() => {
      paginator = new PaginatorComponent({} as any);
    });

    it('should calculate the total amount of pages', () => {
      paginator.length = 100;
      paginator.ngOnChanges({});
      expect(paginator.pageCount).toEqual(10);

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

    it('should calculate the page numbers', (done) => {
      paginator.length = 200;
      paginator.ngOnChanges({});
      paginator.pageNumbers$.subscribe(numbers => {
        expect(numbers.length).toEqual(7);
        done();
      });

      paginator.length = 200;
      paginator.range = 4;
      paginator.ngOnChanges({});
      paginator.pageNumbers$.subscribe(numbers => {
        expect(numbers.length).toEqual(9);
        done();
      })
    });
  });

  describe('UI logic', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [PaginatorModule]
      });
    });

    it('should render the paginator', () => {
      const html = '<ui-paginator [length]="length"></ui-paginator>';
      const fixture = createTestHost(html);

      expect(fixture.componentInstance).toBeTruthy();
      expect(fixture.nativeElement.querySelector(Selectors.ul)).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll(Selectors.li)).toBeTruthy();
    });

    it('should render the correct items', () => {
      const html = '<ui-paginator [page]="page" [length]="length"></ui-paginator>';
      const fixture = createTestHost(html);

      fixture.componentInstance.page = 1;
      fixture.componentInstance.length = 20;
      fixture.detectChanges();
      expectItems(fixture.nativeElement, ['-‹', '+1', '2', '›']);

      fixture.componentInstance.page = 2;
      fixture.componentInstance.length = 40;
      fixture.detectChanges();
      expectItems(fixture.nativeElement, ['‹', '1', '+2', '3', '4', '›']);

      fixture.componentInstance.page = 4;
      fixture.detectChanges();
      expectItems(fixture.nativeElement, ['‹', '1', '2', '3', '+4', '-›']);
    });

    it('should limit the number of shown pages', () => {
      const html = '<ui-paginator [length]="length" [range]="range"></ui-paginator>';
      const fixture = createTestHost(html);

      fixture.componentInstance.range = 1;
      fixture.detectChanges();
      expectItems(fixture.nativeElement, ['-‹', '+1', '2', '3', '›']);

      fixture.componentInstance.range = 2;
      fixture.detectChanges();
      expectItems(fixture.nativeElement, ['-‹', '+1', '2', '3', '4', '5', '›']);

      fixture.componentInstance.range = 3;
      fixture.detectChanges();
      expectItems(fixture.nativeElement, ['-‹', '+1', '2', '3', '4', '5', '6', '7', '›']);
    });

    it('should emit the pageChange event on click', () => {
      const html = '<ui-paginator [length]="length" (pageChange)="paginate($event)"></ui-paginator>';
      const fixture = createTestHost(html);
      const pages = fixture.nativeElement.querySelectorAll(Selectors.li);

      spyOn(fixture.componentInstance, 'paginate');
      pages[2].querySelector('a').click();
      expect(fixture.componentInstance.paginate).toHaveBeenCalled();
      pages[3].querySelector('a').click();
      expect(fixture.componentInstance.paginate).toHaveBeenCalled();
    });

    it('should render ellipsis', () => {
      const html = '<ui-paginator [page]="page" [length]="length" [showEllipsis]="true"></ui-paginator>';
      const fixture = createTestHost(html);

      expectItems(fixture.nativeElement, ['-‹', '+1', '2', '3', '4', '5', '6', '7', '...', '›']);

      fixture.componentInstance.page = 5;
      fixture.detectChanges();
      expectItems(fixture.nativeElement, ['‹', '...', '2', '3', '4', '+5', '6', '7', '8', '...', '›']);

      fixture.componentInstance.page = 9;
      fixture.detectChanges();
      expectItems(fixture.nativeElement, ['‹', '...', '4', '5', '6', '7', '8', '+9', '10', '›']);
    });

    it('should render boundary links', () => {
      const html = '<ui-paginator [page]="page" [length]="length" [showBoundaryLinks]="true"></ui-paginator>';
      const fixture = createTestHost(html);

      expectItems(fixture.nativeElement, ['-«', '-‹', '+1', '2', '3', '4', '5', '6', '7', '›', '»']);

      fixture.componentInstance.page = 5;
      fixture.detectChanges();
      expectItems(fixture.nativeElement, ['«', '‹', '2', '3', '4', '+5', '6', '7', '8', '›', '»']);

      fixture.componentInstance.page = 10;
      fixture.detectChanges();
      expectItems(fixture.nativeElement, ['«', '‹', '4', '5', '6', '7', '8', '9', '+10', '-›', '-»']);
    });

    it('should render custom templates', () => {
      const fixture = createTestHost(`
        <ui-paginator [page]="page" [length]="length" [showBoundaryLinks]="true" [showEllipsis]="true">
          <ng-template ui-paginator-ellipsis>.</ng-template>
          <ng-template ui-paginator-first>First</ng-template>
          <ng-template ui-paginator-prev>Prev</ng-template>
          <ng-template ui-paginator-next>Next</ng-template>
          <ng-template ui-paginator-last>Last</ng-template>
        </ui-paginator>
      `);

      fixture.componentInstance.page = 5;
      fixture.detectChanges();
      expectItems(fixture.nativeElement, ['First', 'Prev', '.', '2', '3', '4', '+5', '6', '7', '8', '.', 'Next', 'Last'], '.');
    });
  });

});

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  page = 1;
  range = 3;
  length = 100;
  perPage = 10;
  disabled = false;
  showEllipsis = true;
  showBoundaryLinks = false;
  paginate = () => {};
}
