import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';
import { listAnimation } from './shared/animations';
import { UidComponentService } from './components/component.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'uid-app',
  templateUrl: './app.component.html',
  animations: [listAnimation]
})
export class AppComponent implements OnInit {

  title = 'UI Components'
  showSidebar = false;
  menuItems: { name: string, path: string }[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private componentService: UidComponentService
  ) {
    this.routeDataChange().subscribe(data => {
      this.parseRouteData(data);
    });
  }

  ngOnInit() {
    for (let [key, value] of this.componentService.components) {
      this.menuItems.push({
        name: value.name,
        path: `components/${key}`,
      })
    }
  }

  parseRouteData(data: any) {
    this.showSidebar = !!data.sidebar;

    if (data.component) {
      this.titleService.setTitle(`${data.component.name} - ${this.title}`);
    } else {
      this.titleService.setTitle(this.title);
    }
  }

  routeDataChange(): Observable<any> {
    return this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => {
        let route = this.route.firstChild;
        let child = route;

        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
            route = child;
          } else {
            child = null;
          }
        }

        return route;
      }),
      mergeMap(route => route.data)
    );
  }
}
