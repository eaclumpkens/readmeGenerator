const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// FUNCTIONS

function generateList(input) {

    let newArray = input.split("-").join("\n * ");

    return newArray;
}

function generateReadme(response) {
    return `
# ${response.title}

${generateList(response.description)}

## Table of Contents

[Installation](#installation)
[Usage](#usage)
[Contribution](#contribution)
[Tests](#tests)
[Questions](#questions)


<a name="installation"></a>
### Installation

${generateList(response.installation)}

<a name="usage"></a>
### Usage
![License](https://img.shields.io/badge/license-${response.license}-orange)

${generateList(response.usage)}

<a name="contribution"></a>
### Contribution

${generateList(response.contribute)}

<a name="tests"></a>
### Tests

${generateList(response.testInfo)}

----

<a name="questions"></a>
### Questions
#### Contact Me

GitHub: ${response.github}
${response.email}
`
    }


// INQUIRER PROMPTS
inquirer.prompt([
    {
        type: "input",
        message: "Project Title:",
        name: "title"
    },
    {
        type: "input",
        message: "Project Description (use - to create bullets at any time):",
        name: "description"
    },
    {
        type: "input",
        message: "Installation Steps:",
        name: "installation"
    },
    {
        type: "input",
        message: "Usage Information:",
        name: "usage"
    },
    {
        type: "list",
        message: "License:",
        name: "license",
        choices: [
            "Apache",
            "MIT",
            "ISC",
            "Other"
        ]
    },
    {
        type: "input",
        message: "Contribution Guidelines:",
        name: "contribute",
    },
    {
        type: "input",
        message: "Test Instructions:",
        name: "testInfo",
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