  
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
];
const firstQuestions = () => {
    inquirer.prompt(questions)
    .then((answers) => {
        switch(answers.initialq){
            case "View all employees":
                viewEmployees()
                break;
            case "View departments":
                viewDepartments()
                break;
            case "View roles":
                viewRoles()
                break;
            case "Add a department":
                addDepartment()
                break;
            case "Add a role":
                addRole()
                break;
            case "Add an employee":
                addEmployee()
                break;
            case "Update employee role":
                updateEmployeeRole()
                break;
            case "Delete employee":
                deleteEmployee()
                break;
            case "Exit":
                connection.end()
                break;
            default:
                console.log("Error")

        };
    });
};

const viewEmployees = () => {
    const query =  connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;        
        if(!res[0]){ 
            console.log("Enter an employee!")
            firstQuestions();
        } else {
            
            console.table(res);
            firstQuestions();
        }
    });
    
};

const viewDepartments = () => {
    const query =  connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        
            console.table(res);
            firstQuestions();
    });
    
};

const viewRoles = () => {
    const query =  connection.query('SELECT * FROM role', (err, res) => {

        if (err) throw err;

            console.table(res);
            firstQuestion();
    });
    
};

function employeeQuestions(roles){

    const employeeQ = [
        {
            type: 'input',
            message: "What is the employee's first name?",
            name: 'firstname',
        },
        {
            type: 'input',
            message: "What is the employee's last name?",
            name: 'lastname',
        },
        {
            type: 'list',
            message: "What is the employee's role?",
            name: 'role',
            choices: roles.map(role => ({name:role.title, value:role.id}))
        }
        ]
        
    return employeeQ
} 