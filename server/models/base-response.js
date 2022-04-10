/*
========================================================
; Title: WEB-450 - Nodebucket - Sprint 3
; Author: Professor Krasso
; Modified by: Gustavo Roo Gonzalez
; Date: 29 March 2022
; Description: Nodebucket App
========================================================
*/

class BaseResponse {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  toObject() {
    return {
      code: this.code,
      msg: this.msg,
      data: this.data,
      timestamp: new Date().toLocaleDateString(),
    };
  }
}

module.exports = BaseResponse;
