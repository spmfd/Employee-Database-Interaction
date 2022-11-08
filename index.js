const inquirer = require("inquirer");
const mysql = require('mysql2');
require('console.table');


// Connection to SQL
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'garfield02',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

    // Initial function

function initiate(){
inquirer.prompt([
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices:['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'quit']
    }
])  .then((response) => {
    switch (response.options) {
        case "view all departments":
            viewDepartments();
            break;
        case 'view all roles':
            viewRoles();
            break;
        case 'view all employees':
             viewEmployees();
             break;
        case 'add a department':
             addDepartment();
             break;
        case 'add a role':
             addRole();
             break;
        case 'add an employee':
             addEmployee();
             break;
        case 'update an employee role':
             updateRole();
             break;  
        default:
            process.exit();
    }
  })};

  initiate()