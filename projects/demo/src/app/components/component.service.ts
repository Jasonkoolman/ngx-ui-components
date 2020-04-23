import { Injectable } from '@angular/core';
import { UidComponent } from './component.interface';

@Injectable({
  providedIn: 'root'
})
export class UidComponentService {
  components = new Map<string, UidComponent>();

  addComponent(slug: string, data: UidComponent) {
    this.components.set(slug, data);
  }

  getComponent(slug: string): UidComponent | null {
    return this.components.get(slug);
  }
}
