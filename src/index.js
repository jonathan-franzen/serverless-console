const { exec } = require('child_process');

let allowList = [];

/**
 * Set the allowed commands for execution.
 * @param {string[]} list - List of allowed commands.
 */
const consoleAllowList = (list) => {
    allowList = list;
};

/**
 * Execute a shell command if it's in the allowed list.
 * @param {string} command - Command to execute.
 * @returns {Promise<void>}
 */
const serverlessConsole = async (command) => {
    if (allowList.length > 0 && !allowList.includes(command)) {
        console.error('Command not allowed.');
        console.error('Allowed commands are:');
        allowList.forEach((cmd) => {
            console.log(cmd);
        });
        return;
    }

    try {
        const data = await new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(stderr || error.message);
                } else {
                    resolve(stdout);
                }
            });
        });

        data.split('\n').forEach((line) => {
            if (line.trim()) {
                console.log(line);
            }
        });
    } catch (error) {
        const errorMessage = typeof error === 'string' ? error : error.message;

        errorMessage.split('\n').forEach((line) => {
            if (line.trim()) {
                console.error(line);
            }
        });
    }
};

module.exports = { consoleAllowList, serverlessConsole };