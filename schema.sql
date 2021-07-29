DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(30)    
);


CREATE TABLE role (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL    
);


CREATE TABLE employee (
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT      
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Goodman",1,null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Trey", "Parker",1,1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Wendy", "McDonald", 1, 1);

INSERT INTO department (department_name)
VALUES ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Analyst", 75000, 1);