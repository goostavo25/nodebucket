/*
========================================================
; Title: WEB-450 - Nodebucket - Sprint 1
; Author: Professor Krasso
; Modified by: Gustavo Roo Gonzalez
; Date: 27 March 2022
; Description: Nodebucket App
========================================================
*/

import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class SignInGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const sessionUser = this.cookieService.get("session_user");
    if (sessionUser) {
      return true;
    } else {
      this.router.navigate(["/session/signin"]);
      return false;
    }
  }
}
