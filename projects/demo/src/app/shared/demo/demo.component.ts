import { ChangeDetectionStrategy, Component, Input, Type, ViewEncapsulation } from '@angular/core';

interface DemoFile {
  name: string;
  source: string;
}


@Component({
  selector: 'uid-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UidDemoComponent {

  @Input() id: string;
  @Input() title: string;
  @Input() component: Type<any>;
  @Input() files: DemoFile[];
  @Input() showCode = false;

  selectedFile: DemoFile = null;

  selectFile(file: DemoFile) {
    this.selectedFile = file;
  }

}
