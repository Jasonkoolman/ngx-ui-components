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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef,

  ) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const { name } = route.snapshot.data.component as UidComponent;
        this.name = name;
        this.changeDetector.markForCheck();
      })
  }
}
