const node_ssh = require('node-ssh');
const shell = require('shelljs');
const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
module.exports = async function(config) {
    const { host, port, username, password, distPath, webDir } = config.dev;
    const spinner = ora();
    const ssh = new node_ssh();
    const sshConfig = {
        host,
        port,
        username,
        password
    }
    try {
        await ssh.connect(sshConfig);
        spinner.succeed(chalk.green('ssh连接成功'))
    } catch (e) {
        console.log(e)
    }
    try {
        await ssh.execCommand('rm -rf *', {cwd: webDir});
    } catch (e) {
        console.log(e)
    }
    try {
        const status = await ssh.putDirectory(path.resolve(__dirname, distPath), webDir);
        if (!status) {
            spinner.fail(chalk.green('上传文件失败'))
        }
        spinner.succeed(chalk.green('部署成功'));
        process.exit();
    } catch (e) {
        console.log(e)
    }

}

