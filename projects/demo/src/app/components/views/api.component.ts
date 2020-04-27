import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UidComponentDocItem, UidComponentApiItem } from '../component.interface';
import documentation from '../../../documentation.json';


@Component({
  selector: 'uid-component-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UidComponentApi {
  items: UidComponentApiItem[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getApi(route.parent.snapshot.data.component.docs);
  }

  getApi(docs: UidComponentDocItem[]) {
    docs.map(docItem => {
      const item = (documentation[docItem.key] as any[]).find(c => c.file.endsWith(docItem.name))

      if (item) {
        this.items.push({
          name: item.name,
          type: item.type,
          selector: item.selector,
          properties: item.properties,
          methods: item.methods,
          inputs: item.inputsClass,
          outputs: item.outputsClass
        })
      }
    })
  }
}
