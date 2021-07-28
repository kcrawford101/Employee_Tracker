  
const inquirer = require('inquirer');
const mysql = require('mysql');
const util=require('util')

const connection = mysql.createConnection({
    host: 'localhost',    
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_tracker_db',
});

const questions = [
    {
        type: 'list',
        message: 'What would like to do?',
        name: 'initialq',
        choices: ['View all employees', 'View departments', 'View roles', 'Add a department','Add a role','Add an employee', 'Update employee role', 'Delete employee', 'Exit']
    }
]