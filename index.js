const inquirer = require("inquirer");
const myModule = require("./functions.js");
const { db, schemaSQL } = require("./server.js");

const Actions = [
  "View All Departments",
  "View All Roles",
  "View All Employees",
  "Add Employee",
  "Add Department",
  "Add Role",
  "Update Employee Role",
];

const //table initialize function

const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: Actions,
      },
    ])
    .then((choice) => {
      switch (choice.start) {
        case "View All Departments":
          myModule.viewDepartments();
          break;
        case "View All Roles":
          myModule.viewRoles();
          break;
        case "View All Employees":
          myModule.viewEmployees();
          break;
        case "Add Employee":
          myModule.addEmployee();
          break;
        case "Add Department":
          myModule.addDepartment();
          break;
        case "Add Role":
          myModule.addRole();
          break;
        case "Update Employee Role":
          myModule.updateRole();
          break;
      }
    });
};

init();
