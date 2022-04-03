/*
========================================================
; Title: WEB-450 - Nodebucket - Sprint 2
; Author: Professor Krasso
; Modified by: Gustavo Roo Gonzalez
; Date: 29 March 2022
; Description: Nodebucket App
========================================================
*/

import { TestBed } from "@angular/core/testing";

import { TaskService } from "./task.service";

describe("TaskService", () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
