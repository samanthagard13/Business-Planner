const inquirer = require("inquirer");
const fs = require("fs");
const { db, schemaSQL } = require("./server.js");

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "role",
        message: "What is the employee's role?",
      },
      {
        type: "input",
        name: "manager",
        message: "Who is the employee's manager",
      },
    ])
    .then((answers) => {
      const sql = `INSERT INTO employees (firstName, lastName, role, manager) VALUES (?, ?, ?, ?)`;

      db.query(
        sql,
        [answers.firstName, answers.lastName, answers.role, answers.manager],
        (err, results) => {
          if (err) {
            console.error("Error adding employee:", err);
            return;
          }
          console.log("Employee added to database.", results);
          init();
        }
      );
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "What is the name of the department?",
      },
    ])
    .then((department_name) => {
      const sql = `INSERT INTO departments (department_name) VALUES (?)`;

      db.query(sql, [department_name], (err, results) => {
        if (err) {
          console.error("Error adding department: ", err);
          return;
        } else {
          console.log("Department added successfully", results);
        }
      });
    });
};

module.exports = {
  addEmployee: addEmployee,
  addDepartment: addDepartment,
};
