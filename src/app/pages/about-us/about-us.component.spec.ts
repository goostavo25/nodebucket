/*
========================================================
; Title: WEB-450 - Nodebucket - Sprint 2
; Author: Gustavo Roo Gonzalez
; Date: 28 March 2022
; Description: Nodebucket App
========================================================
*/

import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AboutUsComponent } from "./about-us.component";

describe("AboutUsComponent", () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutUsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
