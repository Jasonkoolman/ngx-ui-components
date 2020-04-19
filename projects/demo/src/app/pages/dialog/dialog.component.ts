import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DialogRef, DialogService } from 'ngx-ui-components';
import { merge, Subject } from 'rxjs';
import { filter, map, mapTo, takeUntil } from 'rxjs/operators';
import { BasicDialogComponent } from './presets/basic-dialog.component';
import { ConfirmationDialogComponent } from './presets/confirmation-dialog.component';

interface DialogEvent {
  body: string;
  time: number;
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogPageComponent implements OnDestroy {
  events: DialogEvent[] = [];

  page = 1;
  range = 4;
  disabled = false;
  index = 1;
  length = 100;

  private destroy$ = new Subject<void>();

  constructor(private dialog: DialogService) {}

  /**
   * Opens a basic dialog.
   */
  openBasicDialog() {
    const dialog = this.dialog.open(BasicDialogComponent);
    this.recordEvents(dialog);
  }

  /**
   * Opens a confirmation dialog.
   */
  openConfirmationDialog() {
    const data = {
      title: 'Delete project',
      body: 'Are you sure you want to proceed?'
    };

    this.dialog.open(ConfirmationDialogComponent, { data });
  }

  change(pageChange) {
    console.log('Got pagechange', pageChange);
  }

  /**
   * Clears the recorded events.
   */
  clearEvents() {
    this.events = [];
  }

  /**
   * Listens to dialog events for demonstration purposes.
   */
  private recordEvents(ref: DialogRef) {
    const animationEvents$ = ref.containerInstance.animationStateChanged$.pipe(
      filter(event => event.toState !== 'void'),
      map(event => `Animation event ("${event.toState}", "${event.phaseName}")`)
    );

    merge(
      ref.afterOpened().pipe(mapTo('After opened')),
      ref.afterClosed().pipe(mapTo('After closed')),
      ref.beforeClosed().pipe(mapTo('Before closed')),
      animationEvents$
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe((message) => {
      this.events.unshift({
        body: message,
        time: Date.now()
      })
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
