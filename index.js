
const inquirer= require('inquirer');
require('console.table');
const connection = require('./db/connection')

function mainMenu() {
    inquirer.prompt([
        {
        type: 'list',
        name: 'select',
        message: 'How would you like to proceed, indent?',
        choices: [
            {
                name: 'View all departments',
                value: 'view_dep'

            },
            {
                name: 'View all roles',
                value: 'view_role'

            },
            {
                name: 'View all Indents',
                value: 'view_indent'

            },
            {
                name: 'Add a department',
                value: 'dep_add'

            },
            {
                name: 'Add a role',
                value: 'role_add'

            },
            {
                name: 'Add an indent',
                value: 'indent_add'

            },
            {
                name: "Update an Indent's role",
                value: 'indent_update'

            },
    ]}
    ]).then(res => {
        let choice = res.choice;

        switch (choice) {
            case 'view_dep':
                viewDepartment();
                break;
            case 'view_role':
                viewRole();
                break;
            case 'view_indent':
                viewIndent();
                break;
            case 'dep_add':
                depAdd();
                break;
            case 'role_add':
                roleAdd();
                break;
            case 'indent_add':
                indentAdd();
                break;
            case 'indent_update':
                indentUpdate();
                break;
        }
    })
};

function viewDepartment() {
    console.log('working');
    // connection.query('SELECT department.id, department.name FROM department', function (err, results, ) {
    //     console.log(results)
    // })
    // .then(mainMenu);
};

function viewRole() {
    console.log('working')
}

mainMenu();