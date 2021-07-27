const mysql = require("mysql")
const inquirer = require('inquirer')

const connection = mysql.createConnection({
    host: 'localhost',  
    port: 3306,  
    user: 'root',  
    password: '',
    database: 'employee_tracker_db',
});

const initialQuestion = [
    {
        type: 'list',
        message: 'What would like to do?',
        name: 'initialQuestion',
        choices: ['View all employees', 'View departments', 'View roles', 'Add a department','Add a role','Add an employee', 'Update employee role', 'Delete employee', 'Exit']
    }
]