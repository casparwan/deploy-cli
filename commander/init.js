const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const spinner = ora();

const exists = fs.existsSync(path.resolve(__dirname, 'deploy'))
if (exists) {
    console.log(chalk.red('部署配置文件deploy.config.js已存在,请检查!'));
    process.exit(1);
}
if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}
if (shell.exec('git clone https://github.com/casparwan/deploy.git').code !== 0) {
    spinner.fail(chalk.red('下载模板失败'));
    shell.exit(1);
}
spinner.succeed(chalk.green('下载完成'));
spinner.info(chalk.green('请配置deploy目录下的deploy.config.js配置文件'))