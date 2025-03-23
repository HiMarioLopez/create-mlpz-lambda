const { exec } = require("child_process");

/**
 * Run a shell command in the specified directory
 * @param {string} dir Directory to run command in
 * @param {string} command Command to execute
 * @returns {Promise<void>}
 */
async function runCommand(dir, command) {
    return new Promise((resolve, reject) => {
        exec(command, { cwd: dir }, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    });
}

module.exports = {
    runCommand
};
