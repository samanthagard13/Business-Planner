const inquirer = require("inquirer");
const fs = require('fs');
const { db } = require('./server.js');
const module = require('./modules/functions.js');

const Actions = [
  "Add Employee",
  "Add Department",
  "Add Role",
  "Update Empoyee Role",
];

const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: `${Actions}`,
      },
    ])
    .then((choice) => {
      switch (choice.start) {
        case "Add Employee":
          module.addEmployee();
          break;
        case "Add Department":
          module.addDepartment();
          break;
        case "Add Role":
          module.addRole();
          break;
        case "Update Empoyee Role":
          module.updateRole();
          break;
      }
    });
};

init();
