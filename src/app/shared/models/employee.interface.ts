/*
========================================================
; Title: WEB-450 - Nodebucket - Sprint 2
; Author: Professor Krasso
; Modified by: Gustavo Roo Gonzalez
; Date: 29 March 2022
; Description: Nodebucket App
========================================================
*/

import { Item } from "./item.interface";

export interface Employee {
  empId: string;
  todo: Item[];
  done: Item[];
}
