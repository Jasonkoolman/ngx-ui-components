import { Type } from '@angular/core';
import { DemoFile } from '../shared/demo/demo.component';

export interface UidComponent {
  name: string;
  demos: UidComponentDemo[];
  docs: UidComponentDocItem[];
}

export interface UidComponentDemo<T = any> {
  id: string;
  title: string;
  description?: string;
  component: Type<T>
  files: DemoFile[];
}

export interface UidComponentDocItem {
  key: 'components' | 'classes' | 'directives' | 'interfaces' | 'injectables';
  name: string;
}

export interface UidComponentApiItem {
  name: string;
  type: 'component' | 'class' | 'directive' | 'interface' | 'service';
  selector?: string;
  inputs?: any[];
  outputs?: any[];
  properties?: any[];
  methods?: any[];
}

