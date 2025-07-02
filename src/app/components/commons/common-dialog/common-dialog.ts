import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, EmbeddedViewRef, input, signal, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-common-dialog',
  imports: [NgClass, NgStyle],
  templateUrl: './common-dialog.html',
  styles: ``,
  exportAs: 'commonDialog'
})
export class CommonDialog {

  public title = input('');
  public dialogClass = input(''); // CSS class for the dialog
  public mainTemplate = viewChild.required<TemplateRef<any>>('mainTemplate'); // Template for the dialog content
  public dialogStyles = input<Record<string, string>>({}); // Inline styles for the dialog
  private viewRef!: EmbeddedViewRef<any>;
  private container = signal<HTMLElement | null>(null); 
  private modalRef: HTMLDialogElement | null = null;

  public open() {
    this.viewRef = this.mainTemplate().createEmbeddedView(null);
    this.viewRef.detectChanges();
    this.container.set(document.body.appendChild(this.viewRef.rootNodes[0]));
    this.modalRef = this.container() as HTMLDialogElement;
    if (!this.modalRef) {
      console.error('Dialog element not found in the template.');
      return;
    }
    setTimeout(() => {
      this.modalRef?.showModal();
      this.modalRef?.addEventListener('close', () => this.close(), { once: true });
    });
  }

  public close() {
    if (!this.container) {
      return;
    }
    // Close the dialog if it exists
    if (this.modalRef) {
      this.modalRef.close();
    }
    setTimeout(() => {
      // Clean up the view reference and container
      this.viewRef.detach();
      this.viewRef.destroy();
      this.container()?.remove();
      this.container.set(null);
    }, 500);
  }

  public isOpen(): boolean {
    return this.container() !== null;
  }

}
