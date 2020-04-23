import { ChangeDetectionStrategy, Component, Input, OnInit, Type, ViewEncapsulation } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';

interface DemoFile {
  name: string;
  label?: string;
  source: string;
}


@Component({
  selector: 'uid-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UidDemoComponent<T> implements OnInit {

  @Input() id: string;
  @Input() title: string;
  @Input() description: string;
  @Input() component: Type<T>;
  @Input() files: DemoFile[];
  @Input() showCode = false;

  componentPortal: ComponentPortal<T> = null;
  selectedFile: DemoFile = null;

  ngOnInit() {
    this.componentPortal = new ComponentPortal(this.component);
    this.selectedFile = this.files[0];
  }

  selectFile(file: DemoFile) {
    this.selectedFile = file;
  }

}
