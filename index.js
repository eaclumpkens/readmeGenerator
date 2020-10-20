const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

// FUNCTIONS

function generateImages(array){

    if (array) {
        oldArray = array.split(",");
    
        for (i=0; i< oldArray.length; i++) {
            oldArray[i] = `![image](./assets/images/${oldArray[i].trim()}) \n`;  
        }
        return oldArray.join("");

    } else {
        return array;
    }
    
}

function generateList(input) {
    let newArray = input.split("-").join("\n * ");
    return newArray;
}

function generateReadme(response) {
    return `
# ${response.title}
[![License](https://img.shields.io/badge/license-${response.license}-orange)](https://opensource.org/licenses)

${generateList(response.description)}

## Table of Contents

[Installation](#installation)\n
[Usage](#usage)\n
[Contribution](#contribution)\n
[Tests](#tests)\n
[Images](#images)\n
[Questions](#questions)

----

<a name="installation"></a>
### Installation

${generateList(response.installation)}

<a name="usage"></a>
### Usage

${generateList(response.usage)}

<a name="contribution"></a>
### Contribution

${generateList(response.contribute)}

<a name="tests"></a>
### Tests

${generateList(response.testInfo)}

<a name="images"></a>
### Images

${generateImages(response.images)}

----

<a name="questions"></a>
### Questions
#### Contact Me

Feel free to contact me via GitHub or email with any feedback - thanks for checking out my code!

[GitHub u/${response.github}](https://github.com/${response.github})
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
        message: "Image File Names (Rel Path Only [./assets/images] Use , to seperate files w/ extenssion):",
        name: "images",
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
    console.log("Success - ReadMe File Generated");
    writeFileAsync('./generatedReadme/README.md', generateReadme(data))

}).catch(function(err) {
    console.log(err);
})