  
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

    const empQue = [
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
        
    return empQue
}; 

function addEmManager (managers) {
    const managerChoices= managers.map(manager => ({name:manager.full_name, value:manager.id}))
    const managerChoice=[...managerChoices,{name:'None',value:null}]
        const emManager = [{
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'empManager',
            choices: managerChoice
        }]
        return emManager
};

const addEmployee = () => {
    connection.query('SELECT * FROM employee_tracker_db.roles', (err,roles) => {
        const empQue = employeeQuestions(roles)
            inquirer. prompt(empQue)
            .then((answers)=> {
                let emQAnswers = answers
                connection.query ('SELECT employee.id, concat(employee.first_name, " " ,  employee.last_name) AS full_name FROM employee', (err, managers) => {                
                let emManager = addEmManager(managers)
                inquirer.prompt(emManager)
                .then((answers) => {connection.query ('INSERT INTO employee SET ?', 
                {
                    first_name: emQAnswers.firstname,
                    last_name: emQAnswers.lastname,
                    roles_id: emQAnswers.role,
                    manager_id: answers.empManager
                },
                (err, res) => {
                    if (err) throw err;
                    console.log("Your employee has been added");
                    firstQuestion()
            })   
            })
        })
    } 
)}
)};

function roleQuestions(departments) {
    const roleDepartments = [
        {
            type: 'input',
            message: "What is the name of the role you would like to add?",
            name: 'rolename',
        },
        {
            type: 'input',
            message: "What is the salary of this role?",
            name: 'rolesalary',
        },
    {
        type: 'list',
        message: "What department does this role fall under?",
        name: 'roledepart',
        choices: departments.map(department => ({name:department.department_name, value:department.id}))
    }]
    return roleDepartments
};

const addRole = () => {
    connection.query('SELECT * FROM employee_tracker_db.department', (err,departments) => {
        let roleDepartments = roleQuestions(departments)
        inquirer.prompt(roleDepartments)
        .then((answers)=>{
            connection.query ('INSERT INTO roles SET ?', 
        {
            title: answers.rolename,
            salary: answers.rolesalary,
            department_id: answers.roledepart
        },
            (err, res) => {
            if (err) throw err;
            console.log("Role added!");

            firstQuestions()
        });

});
});
};

const addDepartment = () => {

    connection.query('SELECT * FROM employee_tracker_db.department', (err,res) => {
        inquirer.prompt([
            {
                type: 'input',
                message: "What is the name of the department you would like to add?",
                name: 'departname',
            }
        ])
        .then((answers)=>{
            connection.query ('INSERT INTO department SET ?', 
        {
            department_name: answers.departname
        },
            (err, res) => {
            if (err) throw err;

            console.log("Department added!");

            firstQuestions()
        }); 

});
});
};

function updateEmployee (employees) {
    updateQ1 = [
        {
            type: 'list',
            message: "Which employee would you like to update?",
            name: 'employee',
            choices: employees.map(employee => ({name:employee.full_name, value:employee.id}))
        }
    ]
    return updateQ1
};

function updateRole (roles) {
    updateQ2 = [
        {
            type: 'list',
            message: "What is the employee's new role?",
            name: 'newrole',
            choices: roles.map(role => ({name:role.title, value:role.id}))
        }
    ]
    return updateQ2
};

const updateEmployeeRole = () => {
    connection.query ('SELECT employee.id, concat(employee.first_name, " " ,  employee.last_name) AS full_name FROM employee', (err, employees) => {    
        let updateQ1 = updateEQuestion1(employees)
        inquirer.prompt(updateQ1)
        .then((answers) => {
            let employeeAns = answers   
            connection.query('SELECT * FROM employee_tracker_db.roles', (err,roles) => {
            let updateQ2 = updateEQuestion2 (roles)
            inquirer.prompt(updateQ2)
            .then((answers)=> {       
                connection.query('UPDATE employee SET ? WHERE ?', [
                    { roles_id: answers.newrole
                },{
                    id: employeeAns.employee} ],

                (err,res) => {
                    if (err) throw err;
                    console.log('Employee updated!')

                    firstQuestions()
                });

            });
        });
    });
});
};

function deleteEmQ(employees){
    deleteQ = [
        {
            type: 'list',
            message: "Which employee would you like to delete?",
            name: 'deleteemp',
            choices: employees.map(employee => ({name:employee.full_name, value:employee.id}))
        }
    ]
    return deleteQ
}