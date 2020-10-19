const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function generateReadme(response) {
    return `
    
# ${response.projectTitle}

${response.description}

### Contributors

${response.contributors}

----

### Contact Me

GitHub: ${response.github}
${response.email}
`
    }

inquirer.prompt([
    {
        type: "input",
        message: "Project Title:",
        name: "projectTitle"
    },
    {
        type: "input",
        message: "Project Description:",
        name: "description"
    },
    {
        type: "input",
        message: "Installations:",
        name: "installations"
    },
    {
        type: "list",
        message: "License:",
        name: "license",
        choices: [
            "GNU",
            "MIT",
            "ISC",
            "Apache"
        ]
    },
    {
        type: "input",
        message: "Contributors:",
        name: "contributors",
    },
    {
        type: "input",
        message: "GitHub Username:",
        name: "github",
    },
    {
        type: "input",
        message: "Email: ",
        name: "email",
    }
]).then(function(data) {
    console.log("Success.");

    writeFileAsync('README.md', generateReadme(data))

}).catch(function(err) {
    console.log(err);
})