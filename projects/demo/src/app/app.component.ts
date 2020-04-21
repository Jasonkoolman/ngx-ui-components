import { Component } from '@angular/core';
import { listAnimation } from "./shared/animations";
import { UidComponentService } from "./components/component.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [listAnimation]
})
export class AppComponent {

  menuItems: {name: string, path: string}[] = [];

  constructor(private componentService: UidComponentService) {
    for (let [key, value] of componentService.components) {
      this.menuItems.push({
        name: value.name,
        path: `components/${key}`,
      })
    }
  }
}
