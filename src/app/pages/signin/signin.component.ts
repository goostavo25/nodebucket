import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router, private cookieService: CookieService, private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      empId: [null, Validators.compose([Validators.required, Validators.pattern("^[0-9]*$")])],
    });
  }

  get form() {
    return this.signinForm.controls;
  }

  submit() {
    const empId = this.signinForm.controls["empId"].value;

    this.http.get("/api/employees/" + empId).subscribe((res) => {
      if (res) {
        this.cookieService.set("session_user", empId, 1);
        this.router.navigate(["/"]);
      } else {
        this.errorMessage = `Invalid ID.`;
      }
    });
  }
}
