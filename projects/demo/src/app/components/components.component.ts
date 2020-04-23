import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UidComponent } from './component.interface';

@Component({
  selector: 'uid-components',
  templateUrl: './components.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UidComponentsComponent {
  name: string;
  demos: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const component = route.snapshot.data.component as UidComponent;
        this.name = component.name;
        this.demos = component.demos;
        this.changeDetector.markForCheck();
      })
  }
}
