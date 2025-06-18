import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
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
