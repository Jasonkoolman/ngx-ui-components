import { Component } from '@angular/core';
import { listAnimation } from "./shared/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [listAnimation]
})
export class AppComponent {
  menuItems = [
    { name: 'Dialog', path: '/dialog' },
    { name: 'Tooltip', path: '/tooltip' },
    { name: 'Paginator', path: '/paginator' }
  ]
}
