import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./domains/auth/auth.routing").then((c) => c.AuthRouting)
  },
  {
    path: "",
    loadComponent: () => import("./domains/home/page/page.component").then((c) => c.PageComponent)
  },
  {
    path: "w",
    loadComponent: () => import("./core/layout/index/index.component").then((c) => c.IndexComponent),
    canActivate: [authGuard],
    children: [
      {
        path: "jobs/search",
        loadComponent: () => import("./domains/jobs/page/page.component").then((c) => c.PageComponent)
      },
      {
        path: "account",
        children: [
          {
            path: 'favorites',
            loadComponent: () => import("./domains/favorites/pages/index/index.component").then((c) => c.IndexComponent)
          },
          {
            path: 'applications',
            loadComponent: () => import("./domains/applications-tracker/page/index/index.component").then((c) => c.IndexComponent)
          }
        ]
      },
    ]
  },
  {
    path: "**",
    redirectTo: ""
  }
];
