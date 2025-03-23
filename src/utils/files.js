function getLanguageFiles(language, testingFramework) {
    const handlers = require('../templates/handlers');
    const tests = require('../templates/tests');

    const files = {};

    if (language === "typescript") {
        files.handlerExt = "ts";
        files.handlerContent = handlers.getTypescriptHandlerContent();

        files.testExt = "ts";
        if (testingFramework === "jest") {
            files.testContent = tests.getTypescriptJestTestContent();
        }
    } else {
        files.handlerExt = "js";
        files.handlerContent = handlers.getJavascriptHandlerContent();

        files.testExt = "js";
        if (testingFramework === "jest") {
            files.testContent = tests.getJavascriptJestTestContent();
        }
    }

    return files;
}

module.exports = {
    getLanguageFiles
};
