import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./domains/auth/auth.routing").then((c) => c.AuthRouting)
  },
  {
    path: "",
    loadComponent: () => import("./core/layout/index/index.component").then((c) => c.IndexComponent),
    children: [
      {
        path: "",
        loadComponent: () => import("./domains/home/page/page.component").then((c) => c.PageComponent)
      }
    ]
  },
  {
    path: "jobs",
    loadComponent: () => import("./domains/jobs/page/page.component").then((c) => c.PageComponent)
  },
  {
    path: "**",
    redirectTo: ""
  }
];
