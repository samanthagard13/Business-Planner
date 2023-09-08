const inquirer = require("inquirer");

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
    .then((choices) => {
      if (choices === Actions[0]) {
        AddEmployee();
      }
      if (choices === Actions[1]) {
        AddDepartment();
      }
      if (choices === Actions[2]) {
        AddRole();
      } else if (choices === Actions[3]) {
        UpdateEmployee();
      }
    });
};

const AddEmployee = () => {
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
        type: "list",
        name: "manager",
        message: "Who is the employee's manager",
        choices: `{{{managers}}}`,
      },
    ])
    .then((answwers) => {
      //send to mysql database
      console.log(`Added ${firstName} ${lastNamer} to the database.`);
    });
};

init();
