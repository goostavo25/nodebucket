/*
========================================================
; Title: WEB-450 - Nodebucket - Sprint 3
; Author: Professor Krasso
; Modified by: Gustavo Roo Gonzalez
; Date: 29 March 2022
; Description: Nodebucket App
========================================================
*/

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let itemSchema = new Schema({
  text: { type: String },
  status: { type: String },
});

module.exports = itemSchema;
