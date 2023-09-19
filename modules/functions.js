const inquirer = require("inquirer");
const { db } = require("../server");

const viewDepartments = () => {
  db.query("SELECT * FROM department", (err, results) => {
    if (err) {
      console.error("Error fetching department data:", err);
    } else {
      console.log("Department Table");
      console.table(results);
    }
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
    return;
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
    return;
  });
};

const addEmployee = () => {
  let roleNames = [];

  db.query('SELECT title, id FROM role', (err, results) => {
    if (err) {
      console.error('Error retrieving roles:', err);
      return; 
    }
    roleNames = results.map((row) => ({
      name: row.title,
      id: row.id,
    }));

    db.query('SELECT id, first_name, last_name FROM employee WHERE role_id = ?', [10], (err, managerResults) => {
      if (err) {
        console.error('Error retrieving managers:', err);
        return; 
      }

      const managers = managerResults;

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
          },
          {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
          },
          {
            type: 'list',
            name: 'role',
            message: "What is the employee's role?",
            choices: roleNames.map((role) => role.name),
          },
          {
            type: 'list',
            name: 'manager',
            message: "Who is the employee's manager?",
            choices: managers.map((manager) => ({
              name: `${manager.first_name} ${manager.last_name}`,
              value: manager.id,
            })),
          },
        ])
        .then((answers) => {
          
          const selectedRole = roleNames.find((role) => role.name === answers.role);

          if (!selectedRole) {
            console.error('Selected role not found.');
            return; 
          }

          const role_id = selectedRole.id;

          db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
            [answers.firstName, answers.lastName, role_id, answers.manager],
            (err, insertResults) => {
              if (err) {
                console.error('Error adding employee:', err);
                return;
              }
              console.log('Employee added to database.', insertResults);
            }
          );
        });
    });
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
        `INSERT INTO department (name) VALUES (?)`,
        [answers.department_name],
        (err, results) => {
          if (err) {
            console.error("Error adding department: ", err);
            return;
          } else {
            console.log("Department added successfully");
          }
        }
      );
    });
};

const addRole = () => {
  let depNames; 

  db.query("SELECT name, id FROM department", (err, results) => {
    if (err) {
      console.error("Error fetching department names: ", err);
      return;
    }
    
    depNames = results.map((row) => ({
      name: row.name,
      id: row.id, 
    }));

    inquirer
      .prompt([
        {
          type: "input",
          name: "new_role",
          message: "What is the name of the new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for this role?",
        },
        {
          type: "list",
          name: "department_name",
          message: "Choose the department for this role:",
          choices: depNames.map((department) => department.name),

        },
      ])
      .then((answers) => {
        const selectedDepartment = depNames.find(
          (department) => department.name === answers.department_name
        );

        const department_id = selectedDepartment.id;

        db.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [answers.new_role, answers.salary, department_id],
          (err, results) => {
            if (err) {
              console.error("Error adding new role: ", err);
            } else {
              console.log("Role added successfully.", results);
            }
          }
        );
      });
  });
};

const updateRole = () => {

//db employee id name list

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
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [answers.newRole, answers.employeeId],
        (err, results) => {
          if (err) {
            console.error("Error updating employee:", err);
          } else {
            console.log("Employee updated successfully.");
          }
          return;
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
