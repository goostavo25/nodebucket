/*
========================================================
; Title: WEB-450 - Nodebucket - Sprint 1
; Author: Professor Krasso
; Modified by: Gustavo Roo Gonzalez
; Date: 27 March 2022
; Description: Nodebucket App
========================================================
*/

import { HomeComponent } from "./pages/home/home.component";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInGuard } from "./shared/sign-in.guard";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { SignInComponent } from "./pages/sign-in/sign-in.component";

const routes: Routes = [
  {
    path: "",
    component: BaseLayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
        canActivate: [SignInGuard],
      },
      {
        path: "home",
        component: HomeComponent,
        canActivate: [SignInGuard],
      },
    ],
  },
  {
    path: "session",
    component: AuthLayoutComponent,
    children: [
      {
        path: "signin",
        component: SignInComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: "enabled", relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
