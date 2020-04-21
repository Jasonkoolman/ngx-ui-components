import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { UidTooltipBasic } from "./demos/basic/tooltip-basic";

@Component({
  selector: 'uid-basic-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UidTooltipComponent {
  demos = [
    {
      id: 'basic',
      title: 'Basic tooltip',
      component: UidTooltipBasic,
      description: null,
      files: [
        {
          name: 'basic-tooltip.html',
          label: 'HTML',
          source: require('!!raw-loader!./demos/basic/tooltip-basic.html').default
        },
        {
          name: 'basic-dialog.ts',
          label: 'TS',
          source: require('!!raw-loader!./demos/basic/tooltip-basic.ts').default
        }
      ]
    }
  ];
}
