import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UidPaginatorBasic } from "./demos/basic/paginator-basic";

@Component({
  selector: 'uid-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UidPaginatorComponent {
  demos = [
    {
      id: 'basic',
      title: 'Basic paginator',
      component: UidPaginatorBasic,
      description: null,
      files: [
        {
          name: 'basic-paginator.html',
          label: 'HTML',
          source: require('!!raw-loader!./demos/basic/paginator-basic.html').default
        },
        {
          name: 'basic-dialog.ts',
          label: 'TS',
          source: require('!!raw-loader!./demos/basic/paginator-basic.ts').default
        }
      ]
    }
  ];
}
