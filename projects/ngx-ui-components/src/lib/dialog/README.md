# Dialog

The `DialogService` service can be used to open modal dialogs.

### Basic usage

Open a dialog by calling the `open` method on the `DialogService`. The method will return an instance of `DialogRef`, which can be used to access and manage the dialog. 

```typescript
const dialogRef = dialog.open(BasicDialogComponent);
```

The dialog component might look as follows:

```typescript
@Component({
  selector: 'app-basic-dialog',
  template: '<h2>Basic Dialog</h2>'
})
export class BasicDialogComponent {}
```

### Passing configuration

The `open` method accepts a second parameter to pass configuration. See `DialogConfig` for all possible options.

```typescript
dialog.open(BasicDialogComponent, {
  width: '400px',
  height: '600px',
  hasBackdrop: false,
});
```

The `data` property can be used to pass data onto the child component.

```typescript
dialog.open(ConfirmationDialogComponent, {
  data: {
    title: 'Delete Project',
    body: 'Permanently delete this project?'
  }
});
```

### Managing the dialog

The `DialogRef` provides a handle on the opened dialog. 

```typescript
const dialogRef = dialog.open(BasicDialogComponent);

dialogRef.afterOpened().subscribe(() => {
  console.log('Dialog has opened.')
});

dialogRef.beforeClosed().subscribe(() => {
  console.log('Dialog is closing.')
});

dialogRef.afterClosed().subscribe((result) => {
  console.log('Dialog has closed with result:', result);
});

dialogRef.close('Closing dialog');
```

Components created via `DialogService` can inject `DialogRef` and use it to close the dialog in which they are contained. `DialogConfig` can be injected to access configuration.

```typescript
@Component({
  selector: 'app-basic-dialog',
  template: `
    <h2>Basic Dialog</h2>
    <p>I'm a custom dialog component.</p>
    <button (click)="onClose()">Close me</button>
  `,
})
export class BasicDialogComponent {
  constructor(
    private readonly dialogRef: DialogRef<BasicDialogComponent>,
    private readonly dialogConfig: DialogConfig,
  ) {}

  onClose() {
    this.dialogRef.close('Closing dialog from component');
  }
}
```

## Directives

The dialog module comes with a set of handy directives.

```typescript
<h2 ui-dialog-title>
  Submit answers
</h2>
<ui-dialog-content>
  Are you sure?
</ui-dialog-content>
<ui-dialog-footer>
  <button ui-dialog-close>Close</button>
  <button ui-dialog-close [result]="true">Submit</button>
</ui-dialog-footer>
```

## Positioning

The dialog module can be positioned by overriding the default setting `positionStrategy`. The value must be an instance of `GlobalPositionStrategy`, for example:

```
overlay.position().global().centerHorizontally().top('80px')
```

## Custom animations

Custom animations using CSS can be applied by setting `useCssAnimations` to `true`. Enabling this option will make the dialog listen to the `animationstart` and `animationend` events on the container element. A `ui-dialog-enter` class is appended when the dialog opens and a `ui-dialog-leave` when the dialog closes. Now we can apply CSS animations.

```scss
.ui-dialog-enter {
  animation: dialogEnter 400ms ease-in-out;
}

.ui-dialog-exit {
  animation: dialogExit 200ms ease-in-out;
}

@keyframes dialogEnter {
  from { opacity: 0; transform: translateY(50%); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes dialogExit {
  from { opacity: 1; transform: scale(1); }
  to {  opacity: 0; transform: scale(0); }
}
```

## Accessibility

By default, each dialog has `role="dialog"` on the root element. The role can be changed to `alertdialog` via the `DialogConfig` when opening.

The `aria-label`, `aria-labelledby`, and `aria-describedby` attributes can all be set to the dialog element via the `DialogConfig` as well. Each dialog should typically have a label set via `aria-label` or `aria-labelledby`.

#### Keyboard interaction

By default, pressing the escape key will close the dialog. While this behavior can be turned off via the `closeOnEscape` option, users should generally avoid doing so as it breaks the expected interaction pattern.

#### Focus management

Once the dialog has opened, the focus state will be trapped inside of the dialog container. By default, the first focusable element within the container will be focused. This feature can be turned off by setting `autoFocus` to `false`.
