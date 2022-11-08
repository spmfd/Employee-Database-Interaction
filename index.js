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

// Functions after decision has been made 

function viewDepartments() {
    const sql = 'SELECT * FROM department;' 
  
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        initiate();
    }) 
  };

function viewRoles() {
    const sql = 'SELECT * FROM role;' 
  
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        initiate();
    })
};

function viewEmployees() {
    const mysql = `SELECT emp.id, emp.first_name, emp.last_name, title, salary, CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager, name 
                   FROM employee emp
                   LEFT JOIN employee mgr ON mgr.id = emp.manager_id
                   LEFT JOIN role ON emp.role_id = role.id
                   LEFT JOIN department ON role.department_id = department.id;`;

    db.query(mysql, (err, result) => {
        if (err) console.log(err);
        console.table(result);
        initiate();
    }
    )
};

function addDepartment() {
        
inquirer.prompt([
{
    type: 'input',
    name: 'department',
    message: 'Please type the name of the department you would like to add to the database',
}
])  .then((response) => {
    const mysql = `INSERT INTO department (name) VALUE ("${response.department}");`

    db.query(mysql, (err, result) => {
        if (err) console.log(err);
        console.table(result);
        initiate();
    }
    )   
})
}

function addRole() {
        
inquirer.prompt([
{
    type: 'input',
    name: 'title',
    message: 'In order to add a role, please begin by typing in the title of the new role',
},
{
    type: 'input',
    name: 'salary',
    message: 'Please provide the salary for the new role'
},
{
    type: 'input',
    name: 'deptid',
    message: 'Please provide the department ID for the new role. For reference: Admin is 1, Accounting is 2, Loan Management is 3, Hiring is 4, and Customer Service is 5'
},
])  .then((response) => {
    const mysql = `INSERT INTO role (title, salary, department_id) VALUE ("${response.title}", "${response.salary}", "${response.deptid}");`

    db.query(mysql, (err, result) => {
        if (err) console.log(err);
        console.table(result);
        initiate();
    }
    )})
}

function addEmployee() {
        
inquirer.prompt([
{
    type: 'input',
    name: 'firstname',
    message: 'Please type the first name of the employee you are adding to the database',
},
{
    type: 'input',
    name: 'lastname',
    message: 'Please type the last name of the employee you are adding to the database'
},
{
    type: 'input',
    name: 'roleid',
    message: 'Please provide the role ID for the employee you are adding to the database'
},
{
    type: 'input',
    name: 'manager',
    message: 'Please provide the manager ID for whom they will be reporting to. For reference: Khadija Horne is 1, Roxie Bailey is 2, and Lance Austin is 6.',
}
])  .then((response) => {
    const mysql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ("${response.firstname}", "${response.lastname}", "${response.roleid}", "${response.manager}");`

    db.query(mysql, (err, result) => {
        if (err) console.log(err);
        console.table(result);
        initiate();
    }
    )})
}

 function updateRole(){
            
inquirer.prompt([
    {
        type: 'input',
        name: 'id',
        message: 'Please provide the ID for the role you wish to be updated',
    },
    {
        type: 'input',
        name: 'title',
        message: 'Please input the updated job title for the updated role'
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Please provide the updated salary for the updated role'
    }
])  .then((response) => {
    const mysql = `UPDATE role
                    SET title = "${response.title}", salary = "${response.salary}" 
                    WHERE id = ${response.id}`;

    db.query(mysql, (err, result) => {
        if (err) console.log(err);
        console.table(result);
        initiate();
    }
    )})
}