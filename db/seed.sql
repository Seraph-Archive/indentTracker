INSERT INTO department (name)
VALUES ('Legal'), ('Gamers'), ('Media');

INSERT INTO role (title, salary, department_id)
VALUES ('Head Lawyer', 200000, 01), ('Lawyer', 150000, 01), ('Content Creator', 180000, 02), ('Player', 250000, 02), ('Media Manager', 120000, 03), ('Media Rep', 80000, 03);

INSERT INTO indent (first_name, last_name, role_id, Manager_id)
VALUES ('Seraphina', 'Silver', 04, NULL), ('David', 'Davis', 03, NULL), ('Vera', 'Yren', 01, NULL)