import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UidComponent } from "./component.interface";

@Component({
  selector: 'uid-components',
  templateUrl: './components.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UidComponentsComponent {
  name: string;
  demos: any[];

  constructor(private router: ActivatedRoute) {
    const component = router.snapshot.data.component as UidComponent;
    this.name = component.name;
    this.demos = component.demos;
  }
}
