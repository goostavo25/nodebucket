/*
========================================================
; Title: WEB-450 - Nodebucket - Sprint 1
; Author: Gustavo Roo Gonzalez
; Date: 27 March 2022
; Description: Nodebucket App
========================================================
*/

/**
 * Require statements
 */
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const Employee = require("./models/employee");
const BaseResponse = require("./models/base-response");
require("dotenv").config();

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

/**
 * Variables
 */
const port = process.env.PORT || 3000; // server port

// MongoDB Connection
const conn = "mongodb+srv://admin:admin@buwebdev-cluster-1.umga8.mongodb.net/nodebucket?retryWrites=true&w=majority";

/**
 * Database connection
 */
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.debug(`Connection to the database instance was successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  }); // end mongoose connection

/**
 * API(s) go here...
 */

/*
 * findEmployeeById API
 */

app.get("/api/employees/:empId", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Internal server error",
        });
      } else {
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

/*
 * CreateTask API
 * POST methods work by taking form data posted to them and adding it to the database
 */
app.post("/api/employees/:empId/tasks", async (req, res) => {
  try {
    const employeeId = req.params.empId;
    // Finding an employee by ID
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Internal server error: " + err.message,
        });
      } else {
        console.log(employee);

        // Creating the new task
        const newItem = {
          text: req.body.text,
        };

        // Pushing a new task (which is todo by default) to the employee todo array document
        employee.todo.push(newItem);

        // save() returns a promise, which if it succeeds the promise resolves to the document that was saved
        employee.save(function (err, updatedEmployee) {
          if (err) {
            console.log(err);
            res.status(500).send({
              message: "Internal server error: " + err.message,
            });
          } else {
            console.log(updatedEmployee);
            res.json(updatedEmployee);
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: "Internal server error: " + e.message,
    });
  }
});

/*
 * FindAllTasks API
 */
app.get("/api/employees/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, "empId todo done", function (err, employee) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: "Internal server error:" + err.message,
        });
      } else {
        console.log(employee);
        res.json(employee);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal server error: " + e.message);
  }
});

/*
 * updateTask API
 */

app.put("/api/employees/:empId/tasks", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        const updatedTaskMongoErrorResponse = new BaseResponse("501", "MongoDB Server Error", err);
        res.status(501).send(updatedTaskMongoErrorResponse.toObject());
      } else {
        console.log(employee);
        employee.set({
          todo: req.body.todo,
          done: req.body.done,
        });

        employee.save(function (err, updatedEmployee) {
          if (err) {
            console.log(err);
            const updateTaskOnSaveMongoErrorResponse = new BaseResponse("500", "MongoDB Server Error", err);
            res.status(500).send(updateTaskOnSaveMongoErrorResponse.toObject());
          } else {
            console.log(updatedEmployee);
            const updatedTaskOnSuccessResponse = new BaseResponse("200", "Update Successful", updatedEmployee);
            res.json(updatedTaskOnSuccessResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(updateTaskOnSaveMongoErrorResponse.toObject());
  }
});

/**
 * deleteTask API
 */
app.delete("/api/employees/:empId/tasks/:taskId", async (req, res) => {
  try {
    Employee.findOne({ empId: req.params.empId }, function (err, employee) {
      if (err) {
        console.log(err);
        const deleteTaskMongoErrorResponse = new BaseResponse("501", "MongoDB Server Error", err);
        res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      } else {
        console.log(employee);
        const todoItem = employee.todo.find((item) => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find((item) => item._id.toString() === req.params.taskId);

        if (todoItem) {
          employee.todo.id(todoItem._id).remove();
          employee.save(function (err, updatedtodoItemEmployee) {
            if (err) {
              console.log(err);
              const deletetodoItemMongoErrorResponse = new BaseResponse("501", "MongoDB Server Error", err);
              res.status(501).send(deletetodoItemMongoErrorResponse.toObject());
            } else {
              console.log(updatedtodoItemEmployee);
              const deletetodoItemOnSuccessResponse = new BaseResponse("200", "Removed item from the todo List", updatedtodoItemEmployee);
              res.json(deletetodoItemOnSuccessResponse.toObject());
            }
          });
        } else if (doneItem) {
          employee.done.id(doneItem._id).remove();
          employee.save(function (err, updatedDoneItemEmployee) {
            if (err) {
              console.log(err);
              res.status(500).send(updateTaskOnSaveMongoErrorResponse.toObject());
            } else {
              console.log(updatedDoneItemEmployee);
              res.json(updatedDoneItemEmployee.toObject());
            }
          });
        } else {
          console.log("Invalid ID: " + req.params.taskId);
          const deleteTaskNotFoundResponse = new BaseResponse("300", "Invalid taskId", req.params.taskId);
          res.status(300).send(deleteTaskNotFoundResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const deleteTaskCatchErrorResponse = new BaseResponse("500", "Internal Server Error", e);
    res.status(500).send(deleteTaskCatchErrorResponse.toObject());
  }
});
/**
 * Create and start server
 */
http.createServer(app).listen(port, function () {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
