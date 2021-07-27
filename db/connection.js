const inquirer = require('inquirer');
const consoleTable = require('console.table');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_tracker_db"
});

connection.connect();

module.exports = connection;