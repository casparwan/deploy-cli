const inquirer = require('inquirer');
const config = require('../deploy/deploy.config');
const {projectName, dev:{name}} = config;
inquirer.prompt([{
    type: 'confirm',
    message: `${projectName}项目是否部署到${name}？`,
    name: 'sure'
}]).then(answer=>{
    const {sure} = answer;
    if (!sure) {
        process.exit(1);
    }
    const deploy = require('../deploy');
    deploy(config)
})