import { inject } from "@angular/core";
import { UserService } from "../user";
import { Router } from "@angular/router";
import { ToastService } from "../toast-service";

export const appInitializer = () => {
    const userService = inject(UserService);
    const router = inject(Router);
    const toastService = inject(ToastService);
    const hasToken = userService.token;
    if (hasToken) {
        return new Promise<void>((resolve) => {
            userService.getProfileAsync().subscribe({
                next: (user) => {
                    userService.setAuthState(user);
                    resolve();
                },
                error: (err) => {
                    toastService.showError(err);
                    router.navigate(['/login']);
                    resolve(); // Resolve even if there's an error to avoid blocking the app initialization
                },
                complete: () => {
                    resolve(); // Ensure we resolve the promise on completion
                }
            });
        });
    }
    return Promise.resolve(); // No token, no need to fetch profile
}