DROP DATABASE IF EXISTS indents;
CREATE DATABASE indents;
USE indents;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE indent (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES indent(id) ON DELETE SET NULL
)