/*
========================================================
; Title: WEB-450 - Nodebucket - Sprint 1
; Author: Professor Krasso
; Modified by: Gustavo Roo Gonzalez
; Date: 27 March 2022
; Description: Nodebucket App
========================================================
*/

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from "./pages/home/home.component";
import { BaseLayoutComponent } from "./shared/base-layout/base-layout.component";
import { AuthLayoutComponent } from "./shared/auth-layout/auth-layout.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignInComponent } from "./pages/sign-in/sign-in.component";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AboutUsComponent } from "./pages/about-us/about-us.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { CreateTaskDialogComponent } from "./shared/create-task-dialog/create-task-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [AppComponent, HomeComponent, BaseLayoutComponent, AuthLayoutComponent, SignInComponent, AboutUsComponent, ContactUsComponent, NotFoundComponent, CreateTaskDialogComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, DragDropModule, FlexLayoutModule, MatToolbarModule, MatDialogModule, MatButtonModule, MatIconModule, HttpClientModule, FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
