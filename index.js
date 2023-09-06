const inquirer = require("inquirer");
const Actions = ["Add Employee", "Add Department", "Add Role", "Update Empoyee Role"];

const init = () => {
  inquirer
    .createPromptModule([
      {
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: `${Actions}`,
      },
    ])
    .then((choices) => {
        if(choices === Actions[0]) {
            AddEmployee();
        }
        if(choices === Actions[1]) {
            AddDepartment();
        }
        if(choices === Actions[2]) {
            AddRole();
        }
        else if (choices === Actions[3]) {
            UpdateEmployee();
        }
    });
};

init();
