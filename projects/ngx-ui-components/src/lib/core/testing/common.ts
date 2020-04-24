import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';

/**
 * Creates a (host) component with the given template for convenient testing.
 */
export function createGenericTestComponent<T>(
  component: Type<T>,
  template: string,
  detectChanges = true
): ComponentFixture<T> {
  TestBed.overrideComponent(component, {
    set: {template}
  });

  const fixture = TestBed.createComponent(component);

  if (detectChanges) {
    fixture.detectChanges();
  }

  return fixture as ComponentFixture<T>;
}
