import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Toastify from 'toastify-js'

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private getErrorMessage(err: string | HttpErrorResponse): string {
    let message = 'An error occurred';
    if (typeof err === 'string') {
      message = err;
    } else if (err instanceof HttpErrorResponse) {
      message = `${err.error.status || err.status}: ${err.error?.message || 'An error occurred'}`;
    }
    return message;
  }

  public showError(err: string | HttpErrorResponse, duration: number = 3000) {
    const message = this.getErrorMessage(err);
    Toastify({
      text: message,
      duration: duration,
      close: false,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "var(--color-base-200)",
        color: "var(--color-red-500)",
        borderRadius: "1rem",
        border: "2px solid var(--color-red-500)",
        zIndex: '9999', // Ensure it appears above other elements
      },
    }).showToast();
  }

  public showSuccess(message: string, duration: number = 3000) {
    Toastify({
      text: message,
      duration: duration,
      close: false,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "var(--color-base-200)",
        color: "var(--color-green-500)",
        borderRadius: "1rem",
        border: "2px solid var(--color-green-500)",
        zIndex: '9999', // Ensure it appears above other elements
      },
    }).showToast();
  }

  public showInfo(message: string, duration: number = 3000) {
    Toastify({
      text: message,
      duration: duration,
      close: false,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "var(--color-base-200)",
        color: "var(--color-blue-300)",
        borderRadius: "1rem",
        border: "2px solid var(--color-blue-300)",
        zIndex: '9999', // Ensure it appears above other elements
      },
    }).showToast();
  }

}
