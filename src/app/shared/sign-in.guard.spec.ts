/*
========================================================
; Title: WEB-450 - Nodebucket - Sprint 1
; Author: Professor Krasso
; Modified by: Gustavo Roo Gonzalez
; Date: 27 March 2022
; Description: Nodebucket App
========================================================
*/

import { TestBed } from "@angular/core/testing";

import { SignInGuard } from "./sign-in.guard";

describe("SignInGuard", () => {
  let guard: SignInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignInGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
