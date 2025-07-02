import { AfterViewInit, Directive, ElementRef, inject, input, OnChanges } from '@angular/core';

@Directive({
  selector: '[loadingBtn]'
})
export class LoadingBtn implements OnChanges {

  public loadingBtn = input.required<boolean>();
  private elRef: ElementRef<HTMLElement> = inject(ElementRef);
  private loadingElementStr = `<span class="loading loading-xs loading-spinner" id="loading-spinner-inserted"></span>`

  ngOnChanges() {
    if (this.loadingBtn()) {
      this.elRef.nativeElement.setAttribute('disabled', 'true');
      this.elRef.nativeElement.insertAdjacentHTML('afterbegin', this.loadingElementStr);
    } else {
      this.elRef.nativeElement.removeAttribute('disabled');
      const loadingSpinner = this.elRef.nativeElement.querySelector('#loading-spinner-inserted');
      if (loadingSpinner) {
        loadingSpinner.remove();
      }
    }
  }

}
