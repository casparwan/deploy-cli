const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
if (!fs.existsSync(path.resolve(__dirname, '../deploy/deploy.config.js'))) {
    console.log(chalk.red('部署配置文件deploy.config.js不存在,请执行caspar init'));
    process.exit(1);
}
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