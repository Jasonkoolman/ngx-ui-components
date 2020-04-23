import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';

import { DialogRef } from './dialog-ref';
import { DialogContainerComponent } from './dialog-container.component';
import { DialogConfig } from './dialog-config';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  /** The opened dialogs (last in, first out) */
  private openDialogs: DialogRef[] = [];

  constructor(private overlay: Overlay) {}

  /**
   * Opens a dialog containing the given component.
   *
   * @param   component   Type of the the component to load into the dialog.
   * @param   config      Dialog configuration options.
   * @returns reference   Reference of the newly-opened dialog.
   */
  open<T, D = any>(component: ComponentType<T>, config?: DialogConfig<D>): DialogRef {
    const dialogConfig = {...new DialogConfig(), ...config};
    const overlayRef = this.createOverlay(dialogConfig);
    const dialogContainer = this.attachContainer(overlayRef, dialogConfig);
    const dialogRef = this.attachContent(component, dialogContainer, overlayRef, dialogConfig);

    this.addOpenDialog(dialogRef);

    return dialogRef;
  }

  /**
   * Closes all opened dialogs.
   */
  closeAll() {
    this.openDialogs.forEach(dialogRef => {
      dialogRef.close();
    });
  }

  /**
   * Creates the overlay into which the dialog will be loaded.
   */
  private createOverlay(config: DialogConfig): OverlayRef {
    const positionStrategy = config.positionStrategy || this.overlay.position().global().centerHorizontally().centerVertically();
    const scrollStrategy = config.scrollStrategy || this.overlay.scrollStrategies.block();
    const overlayConfig = new OverlayConfig({
      panelClass: config.panelClass,
      backdropClass: [config.backdropClass, 'ui-dialog-backdrop'],
      hasBackdrop: config.hasBackdrop,
      disposeOnNavigation: config.closeOnNavigation,
      positionStrategy,
      scrollStrategy,
      ...(config.size || {})
    });

    return this.overlay.create(overlayConfig);
  }

  /**
   * Attaches a DialogComponent to the overlay.
   */
  private attachContainer(overlay: OverlayRef, config: DialogConfig): DialogContainerComponent {
    const injector = Injector.create({
      providers: [{provide: DialogConfig, useValue: config}]
    });

    const containerPortal = new ComponentPortal(DialogContainerComponent, null, injector);
    const containerRef = overlay.attach<DialogContainerComponent>(containerPortal);

    return containerRef.instance;
  }

  /**
   * Attaches the user-provided component to the already-created container.
   */
  private attachContent<T>(
    component: ComponentType<T>,
    container: DialogContainerComponent,
    overlayRef: OverlayRef,
    config: DialogConfig
  ): DialogRef<T> {
    const dialogRef = new DialogRef<T>(overlayRef, container);
    const injector = this.createInjector<T>(container, dialogRef, config);
    const portal = new ComponentPortal(component, null, injector);
    const contentRef = container.attachComponentPortal<T>(portal);

    dialogRef.componentInstance = contentRef.instance;

    return dialogRef;
  }

  /**
   * Creates a custom injector to be used inside the dialog.
   *
   * This allows the component loaded inside to access the dialogs'
   * configuration and methods (e.g. to close itself) using DI.
   */
  private createInjector<T>(
    dialogContainer: DialogContainerComponent,
    dialogRef: DialogRef<T>,
    dialogConfig: DialogConfig,
  ): Injector {
    return Injector.create({
      providers: [
        {provide: DialogContainerComponent, useValue: dialogContainer},
        {provide: DialogRef, useValue: dialogRef},
        {provide: DialogConfig, useValue: dialogConfig}
      ]
    });
  }

  /**
   * Add a newly-opened dialog.
   */
  private addOpenDialog(dialogRef: DialogRef) {
    this.openDialogs.push(dialogRef);

    dialogRef.afterClosed().subscribe(() => {
      this.removeOpenDialog(dialogRef);
    });
  }

  /**
   * Remove a open dialog.
   */
  private removeOpenDialog(dialogRef: DialogRef) {
    const index = this.openDialogs.indexOf(dialogRef);

    if (index > -1) {
      this.openDialogs.splice(index, 1);
    }
  }
}
