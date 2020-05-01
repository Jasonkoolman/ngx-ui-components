import { Component, NgModule } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DialogModule, DialogService } from '@koolm/ngx-ui-components';

const Selectors = {
  container: 'ui-dialog'
}


describe('Dialog', () => {
  let service: DialogService;
  let overlay: OverlayContainer;
  let overlayElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogModule, TestModule]
    });
  });

  beforeEach(inject([DialogService, OverlayContainer],
    (s: DialogService, o: OverlayContainer) => {
      service = s;
      overlay = o;
      overlayElement = o.getContainerElement();
    }
  ));

  it('should open and close the dialog', (done) => {
    const ref = service.open(TestDialogComponent);
    expect(overlayElement.textContent).toContain('Hello world');
    expect(overlayElement.querySelector(Selectors.container)).toBeTruthy();
    ref.close();
    ref.afterClosed().subscribe(() => {
      expect(overlayElement.querySelector(Selectors.container)).toBeFalsy();
      done();
    });
  });

});

@Component({
  selector: 'test-dialog',
  template: '<p>Hello world</p>'
})
class TestDialogComponent {}

@NgModule({
  imports: [DialogModule, NoopAnimationsModule]
})
class TestModule {}
