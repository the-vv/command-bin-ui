import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./components/layout/main/main').then(m => m.Main),
        children: [
            {
                path: '',
                loadComponent: () => import('./components/pages/dashboard/dashboard').then(m => m.Dashboard)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./components/pages/auth/login/login').then(m => m.Login)
    }
];
