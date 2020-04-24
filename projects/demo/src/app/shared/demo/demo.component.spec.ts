import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UidDemoComponent } from './demo.component';

describe('DemoComponent', () => {
  let component: UidDemoComponent;
  let fixture: ComponentFixture<UidDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UidDemoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UidDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
