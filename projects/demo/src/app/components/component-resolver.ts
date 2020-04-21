import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { UidComponentService } from "./component.service";
import { UidComponent } from "./component.interface";

@Injectable({
  providedIn: 'root'
})
export class UidComponentResolver implements Resolve<UidComponent> {

  constructor(
    private componentService: UidComponentService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UidComponent> {
    const component = this.componentService.getComponent(
      route.paramMap.get('slug')
    );

    if (!component) {
      this.router.navigateByUrl('/');
      return EMPTY;
    }

    return of(component);
  }

}
