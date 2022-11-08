INSERT INTO department (name)
VALUES  ('Admin'),
        ('Accounting'),
        ('Loan Management'),
        ('Hiring'),
        ('Customer Service');

INSERT INTO role (title, salary, department_id)
VALUES  ('Manager', 1000000.00, 1),
        ('Hiring Manager', 80000.00, 5),
        ('Team Lead', 60000.00, 3),
        ('Processor', 40000.00, 3),
        ('CS Rep', 45000.00, 4),
        ('CS Escalation', 65000.00, 4),
        ('Junior Accountant', 60000.00, 2),
        ('Senior Accountant', 150000.00, 2),
        ('Quality Assurance', 55000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Khadija', 'Horne', 1, NULL),
        ('Roxie', 'Bailey', 5, NULL),
        ('Stanley', 'Maynard', 4, 1),
        ('Colleen', 'Firth', 2, 2),
        ('Geraint', 'Hays', 7, 1),
        ('Lance', 'Austin', 8, NULL),
        ('Maud', 'Marquez', 6, 6),
        ('Ayaz', 'Farrington', 3, 6),
        ('Ema', 'Conroy', 9, 2),
        ('Darin', 'Mcnally', 3, 2);