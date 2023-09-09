const inquirer = require("inquirer");
const fs = require('fs');
const { db } = require('./server.js');

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
          type: "list",
          name: "manager",
          message: "Who is the employee's manager",
          choices: `{{{managers}}}`,
        },
      ])
      .then((firstName, lastName, role, manager) => {
        const sql = `INSERT INTO employees (firstName, lastName, role, manager) VALUES (${firstName}, ${lastName}, ${role}, ${manager})`;

        db.query(sql, [firstName, lastName, role, manager], (err, results) => {
          if (err) {
            console.error('Error adding employee:', err);
            return;
          }
        })
    });
  };

  const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "department_name",
                message: "What is the name of the department?",
            }
        ])
        .then((department_name) => {
            const sql = `INSERT INTO departments (department_name) VALUES (${department_name})`;

            db.query(sql, [department_name], (err, results) => {
                if (err) {
                    console.error('Error adding department: ', err);
                    return;
                }
                console.log('Deparment added successfully');
            })
        });
  };

  module.exports = {
    addEmployee: addEmployee,
    addDepartment: addDepartment,
  };
   
  