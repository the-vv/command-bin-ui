import { AfterViewInit, Directive, ElementRef, inject, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[inputValidation]'
})
export class InputValidationDirective implements AfterViewInit, OnDestroy {

    private control: NgControl | null = inject(NgControl, { optional: true });
    private elementRef: ElementRef = inject(ElementRef);

    private sub = new Subscription();

    ngAfterViewInit() {
        if (this.control?.control) {
            this.sub.add(this.control?.control?.statusChanges?.subscribe(status => {
                if (!this.control?.control?.dirty) {
                    this.elementRef.nativeElement.classList.remove('input-error');
                    return;
                }
                if (status === 'INVALID') {
                    this.elementRef.nativeElement.classList.add('input-error');
                } else {
                    this.elementRef.nativeElement.classList.remove('input-error');
                }
            }))
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}