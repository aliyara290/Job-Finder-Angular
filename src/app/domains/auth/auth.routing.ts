import { Routes } from '@angular/router';

export const AuthRouting: Routes = [
  {
    path: "login",
    loadComponent: () => import("./components/login-from/login-from.component").then((c) => c.LoginFromComponent)
  },
  {
    path: "register",
    loadComponent: () => import("./components/register-from/register-from.component").then((c) => c.RegisterFromComponent)
  }
];
