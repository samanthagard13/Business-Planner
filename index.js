const inquirer = require("inquirer");
const myModule = require("./functions.js");
const { db, connectDatabase } = require("./server.js");

const Actions = [
  "Add Employee",
  "Add Department",
  "Add Role",
  "Update Empoyee Role",
];

const init = () => {
  db.query(`CREATE DATABASE business_db`, function (err, results) {
    console.log(results);
  });
  connectDatabase();
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
        case "Add Employee":
          myModule.addEmployee();
          break;
        case "Add Department":
          myModule.addDepartment();
          break;
        case "Add Role":
          myModule.addRole();
          break;
        case "Update Empoyee Role":
          myModule.updateRole();
          break;
      }
    });
};

init();
