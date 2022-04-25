INSERT INTO department (name, id)
VALUES ('Legal', 01), ('Gamers', 02), ('Media', 03);

INSERT INTO role (id, title, salary, department_id)
VALUES (01, 'Head Lawyer', 200000, 01), (02, 'Lawyer', 150000, 01), (03, 'Content Creator', 180000, 02), (04, 'Player', 250000, 02), (05, 'Media Manager', 120000, 03), (06, 'Media Rep', 80000, 03);

INSERT INTO indent (id, first_name, last_name, role_id)
VALUES (01, 'Seraphina', 'Silver', 04), (02, 'David', 'Davis', 03), (03, 'Vera', 'Yren', 01)