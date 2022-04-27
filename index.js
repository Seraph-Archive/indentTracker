
const { createPromptModule } = require('inquirer');
const inquirer= require('inquirer');
const { listenerCount } = require('./db/connection');
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
            {
                name: 'Quit',
                value: 'quit'
            }
    ]}
    ]).then(res => {
        let choice = res.select;
        console.log(choice)

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
            default:
                quit();
                break;
        }
    })
};

function viewDepartment() {
    viewDep().then(([res]) => { console.table(res)}).then(mainMenu)

};

function viewRole() {
    viewRoleTable().then(([res]) => { console.table(res)}).then(mainMenu)
};

function viewIndent() {
    viewIndentTable().then(([res]) => { console.table(res)}).then(mainMenu)
};

function depAdd() {
    inquirer.prompt([
    {
        name: 'name',
        message: 'What is the name of the department?'
    }
    ]).then(res => { createDep(res)}).then(() => console.log('Added to database')).then(mainMenu);
};

function roleAdd() {
     getDep().then(([res]) => {
    let depChoice =res.map(({ id, name}) => ({
        name: name,
        value: id
    })) 
     inquirer.prompt([
             {
                 name: 'name',
                 message: 'What is the name of the role?'
            },
             {
                 name: 'salary',
                 message: 'What is the salary of the role?'
             },
            {
                 type: 'list',
                 name: 'department_id',
                 message: 'what department does the role belong to?',
                 choices: depChoice
             }
         ]);
}).then(res => { createRole(res)}).then(() => console.log('Role added')).then(mainMenu);
};

function indentAdd() {
    inquirer.prompt([
        {
            name: 'first_name',
            message: "What is the indent's first name?"
        },
        {
            name: 'last_name',
            message: "What is the indent's last name?"
        }
    ]).then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;

        getRole().then(([res]) => {
            const roleChoice = res.map (({ id, title }) => ({
                name: title,
                value: id
            }));

            inquirer.prompt({
                type: 'list',
                name: 'role_id',
                message: 'What role does the Indent have?',
                choices: roleChoice
            }).then(res => {
                let roleId = res.role_id;

                getIndent().then(([res]) => {
                    const managerChoice = res.map (({ id, first_name, last_name }) => ({
                        name: `${first_name} ${last_name}`,
                        value: id
                    }));

                    inquirer.prompt(
                        {
                            type: 'list',
                            name: 'manager_id',
                            message: "Who is the indent's manager?",
                            choices: managerChoice
                        }
                    ).then(res => {
                        let indent = {
                            manager_id: res.manager_id,
                            role_id: roleId,
                            first_name: firstName,
                            last_name: lastName
                        }
                        createIndent(indent);
                    }).then(() => console.log('Indent added')).then(mainMenu)
                })
            })
        })
    })
}

function indentUpdate() {
    getIndent(([res]) => {
        const indentChoice = res.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id
        }));
        inquirer.prompt([
            {
                type: 'list',
                name: 'indent_id',
                message: "Which Indent's role would you like to change?",
                choices: indentChoice
            }
        ]).then(res => { let indentId = res.indent_id;
            getRole().then(([res]) => {
                const roleChoice = res.map (({ id, title }) => ({
                    name: title,
                    value: id
                }));
                inquirer.prompt([{
                    type: 'list',
                    name: 'role_id',
                    message: 'What role is the Indent changing to?',
                    choices: roleChoice
                }])}).then(res => {updateIndent(indentId, res.role_id)}).then(() => console.log('Indent Updated')).then(mainMenu)
        })
    })
}



viewDep = () => {
    return connection.promise().query('SELECT * FROM department')
};

viewRoleTable = () => {
    return connection.promise().query('SELECT * FROM role')
};

viewIndentTable = () => {
    return connection.promise().query('SELECT * FROM indent')
};

createDep = (name) => {
    return connection.promise().query('INSERT INTO department SET ?', name);
}

createRole = (name) => {
    return connection.promise().query('INSERT INTO role SET ?', name);
}

getDep = () => {
    return connection.promise().query('SELECT department.id, department.name FROM department')
}

getRole = () => {
    return connection.promise().query('SELECT role.id, role.title FROM role')
}

getIndent = () => {
    return connection.promise().query('SELECT * FROM indent')
}

createIndent = (name) => {
    return connection.promise().query('INSERT INTO indent SET ?', name);
}

updateIndent = (indentId, roleId) => {
    return connection.promise().query('UPDATE indent SET role_id = ? WHERE id = ?', [roleId, indentId])
}


function quit() {
    process.exit();
};

mainMenu();