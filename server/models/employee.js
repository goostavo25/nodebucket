/*
========================================================
; Title: WEB-450 - Nodebucket - Sprint 1
; Author: Gustavo Roo Gonzalez
; Date: 27 March 2022
; Description: Nodebucket App
========================================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let employeeSchema = new Schema(
  {
    empId: { type: String, unique: true, dropDups: true },
    firstName: { type: String },
    lastName: { type: String },
  },
  { collection: "employees" }
);

module.exports = mongoose.model("Employee", employeeSchema);
