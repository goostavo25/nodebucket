/*
========================================================
; Title: WEB-450 - Nodebucket - Sprint 1
; Author: Professor Krasso
; Modified by: Gustavo Roo Gonzalez
; Date: 27 March 2022
; Description: Nodebucket App
========================================================
*/

import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"],
})
export class SignInComponent implements OnInit {
  form: FormGroup;
  error: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
    });
  }
  login() {
    const empId = this.form.controls["empId"].value;

    this.http.get("/api/employees/" + empId).subscribe((res) => {
      if (res) {
        console.log(res);
        /**
         * Add first and last name to session storage
         */
        sessionStorage.setItem("name", `${res["firstName"]} ${res["lastName"]}`);
        this.cookieService.set("session_user", empId, 1);
        this.router.navigate(["/"]);
      } else {
        this.error = "You must enter a valid Employee ID to proceed";
      }
    });
  }
}
