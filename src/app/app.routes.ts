import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'detailed-analysis',
    loadComponent: () => import('./pages/pillars/pillars.component').then(m => m.PillarsComponent)
  },
  {
    path: 'oracle',
    loadComponent: () => import('./pages/oracle/oracle.component').then(m => m.OracleComponent)
  },
  {
    path: 'learning-center',
    loadComponent: () => import('./pages/learning/learning.component').then(m => m.LearningComponent)
  },
  {
    path: 'testimonials',
    loadComponent: () => import('./pages/testimonials/testimonials.component').then(m => m.TestimonialsComponent)
  },
  {
    path: 'support-privacy',
    loadComponent: () => import('./pages/support/support.component').then(m => m.SupportComponent)
  },
  {
    path: 'lnk',
    loadComponent: () => import('./pages/ad-router/ad-router.component').then(m => m.AdRouterComponent)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
