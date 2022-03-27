import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-base-layout",
  templateUrl: "./base-layout.component.html",
  styleUrls: ["./base-layout.component.css"],
})
export class BaseLayoutComponent implements OnInit {
  constructor(private cookieService: CookieService, private router: Router) {}

  year: number = Date.now();

  ngOnInit(): void {}

  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(["/session/sign-in"]);
  }
}
