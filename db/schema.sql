DROP DATABASE IF EXISTS indents;
CREATE DATABASE indents;
USE indents;

CREATE TABLE department (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL FOREIGN KEY REFERENCES department(id)
);

CREATE TABLE indent (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL FOREIGN KEY REFERENCES role(id)
)