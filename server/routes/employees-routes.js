const express = require("express");
const Employee = require("../models/employee");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    Employee.find({}, function (err, employees) {
      if (err) {
        console.log(err);

        res.status(500).send({
          message: "Internal server error",
        });
      } else {
        console.log(employees);

        res.json(employees);
      }
    });
  } catch (e) {
    console.log(e);

    res.status(500).send({
      message: "Internal server error",
    });
  }
});

router.get("/api/employees/:empId", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (error, employee) {
      if (error) {
        res.status(500).send({
          message: `Error. Invalid ID`,
        });
      } else {
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (e) {
    res.status(500).send({
      message: `Server Error`,
    });
  }
});

module.exports = router;
