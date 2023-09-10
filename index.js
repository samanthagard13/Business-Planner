const inquirer = require("inquirer");
const myModule = require("./functions.js");
const { db, schemaSQL } = require("./server.js");

const Actions = [
  "Add Employee",
  "Add Department",
  "Add Role",
  "Update Empoyee Role",
];

const createDatabaseIfNotExists = () => {
  db.query(schemaSQL, (err) => {
    if (err) {
      console.error('Error executing schema:', err);
      return;
    }
    console.log('Schema executed successfully.');
  });
  init();
};

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

createDatabaseIfNotExists();
