const packageJson = require('./templates/packageJson');
const handlers = require('./templates/handlers');
const tests = require('./templates/tests');
const config = require('./templates/config');
const misc = require('./templates/misc');
const dependencies = require('./utils/dependencies');
const files = require('./utils/files');

module.exports = {
    templates: {
        packageJson,
        handlers,
        tests,
        config,
        misc
    },
    utils: {
        dependencies,
        files
    }
};
