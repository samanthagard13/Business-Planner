const inquirer = require("inquirer");
const { db } = require("./server.js");

const viewDepartments = () => {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.error("Error fetching department data:", err);
    } else {
      console.log("Department Table");
      console.table(results);
    }
    init();
  });
};

const viewRoles = () => {
  db.query("SELECT * FROM role", (err, results) => {
    if (err) {
      console.error("Error fetching role data:", err);
    } else {
      console.log("Role Table");
      console.table(results);
    }
    init();
  });
};

const viewEmployees = () => {
  db.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.error("Error fetching employee data:", err);
    } else {
      console.log("Employee Table");
      console.table(results);
    }
    init();
  });
};

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
      db.query(`INSERT INTO employee (firstName, lastName, role, manager) VALUES (?, ?, ?, ?)`,
        [
          answers.firstName, 
          answers.lastName, 
          answers.role, 
          answers.manager
        ],
        (err, results) => {
          if (err) {
            console.error("Error adding employee:", err);
            return;
          }
          console.log("Employee added to database.", results);
        }
      );
      db.query(`DESCRIBE employee`);
      init();
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
    .then((answers) => {
      db.query(
        `INSERT INTO departments (department) VALUES (?)`,
        [answers.department_name], 
        (err, results) => {
          if (err) {
            console.error("Error adding department: ", err);
            return;
          } else {
            console.log("Department added successfully", results);
          }
      });
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "new_role",
        message: "What is the name of the new role?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?"
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter the department ID for this role:",
      },
    ])
    .then((answers) => {
      db.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [answers.new_role, answers.salary, answers.department_id],
        (err, results) => {
          if (err) {
            console.error("Error adding new role: ", err);
          } else {
            console.log("Role added successfully.", results);
          }
          init();
        }
      );
    });
};

const updateRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Enter the ID of the employee you would like to update:",
      },
      {
        type: "input",
        name: "newRole",
        message: "Enter the new role for the employee:",
      },
    ])
    .then((answers) => {
      db.query(
        "UPDATE employee SET role = ? WHERE id = ?",
        [answers.newRole, answers.employeeId],
        (err, results) => {
          if (err) {
            console.error("Error updating employee:", err);
          } else {
            console.log("Employee updated successfully.");
          }
          init();
        }
      );
    });
};

module.exports = {
  viewDepartments: viewDepartments,
  viewRoles: viewRoles,
  viewEmployees: viewEmployees,
  addEmployee: addEmployee,
  addDepartment: addDepartment,
  addRole: addRole,
  updateRole: updateRole,
};
