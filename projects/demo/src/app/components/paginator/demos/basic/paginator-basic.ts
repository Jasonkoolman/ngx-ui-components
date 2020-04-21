import { Component } from '@angular/core';
import { PageEvent } from "@koolm/ngx-ui-components";

@Component({
  selector: 'uid-paginator-basic',
  templateUrl: 'paginator-basic.html',
})
export class UidPaginatorBasic {
  paginate(event: PageEvent) {
    console.log(event);
  }
}
