import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UidComponentDemo } from '../component.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'uid-component-examples',
  templateUrl: './examples.component.html'
})
export class UidComponentExamples {
  demos: UidComponentDemo[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private changeDetector: ChangeDetectorRef
  ) {
    router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        this.demos = route.parent.snapshot.data.component.demos;
        this.changeDetector.markForCheck();
      });
  }
}
