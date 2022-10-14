import { config } from './wdio.shared.conf';
import * as dotenv from 'dotenv';
dotenv.config();

const reportportal = require('wdio-reportportal-reporter');
const RpService = require('wdio-reportportal-service');

const conf = {
    reportPortalClientConfig: { // report portal settings
        token: process.env.PORTAL_TOKEN,
        endpoint: process.env.PORTAL_ENDPOINT,
        launch: process.env.SESSION_NAME,
        project: process.env.PORTAL_PROJECT,
        mode: 'DEFAULT',
        debug: false,
        description: 'Launch description text',
        attributes: [],
        headers: {}, // optional headers for internal http client
    },
    reportSeleniumCommands: false, // add selenium commands to log
    seleniumCommandsLogLevel: 'debug', // log level for selenium commands
    autoAttachScreenshots: false, // automatically add screenshots
    screenshotsLogLevel: 'info', // log level for screenshots
    parseTagsFromTestTitle: false, // parse strings like `@foo` from titles and add to Report Portal
    cucumberNestedSteps: false, // report cucumber steps as Report Portal steps
    autoAttachCucumberFeatureToScenario: false, // requires cucumberNestedSteps to be true for use
    sanitizeErrorMessages: true, // strip color ascii characters from error stacktrace
};

// const client = new RPClient(configRP);
//
// ======
// Appium
// ======
//
config.services = (config.services ? config.services : []).concat([
    [
        "appium",
        {
            // This will use the globally installed version of Appium
            command: "appium",
            args: {
                // This is needed to tell Appium that we can execute local ADB commands
                // and to automatically download the latest version of ChromeDriver
                relaxedSecurity: true,
                address: "localhost",
                // Write the Appium logs to a file in the root of the directory
                log: "./appium.log",
            },
        },
    ],
]);

config.services?.push([RpService, {}]);
config.reporters?.push([reportportal, conf]);

//
// =====================
// Server Configurations
// =====================
//
config.port = 4723;

config.onComplete = async function (exitCode, config, capabilities, results) {
    try {
        const link = await RpService.getLaunchUrl(config);
        console.log(`Report portal link ${link}`);
        // const uniq = await client.getUniqId();
        // console.log(uniq);
        // const launchObj = client.map[uniq];
        // console.log(launchObj);
        // // const ddq = client.helpers.now();
        // console.log(results);
    } catch (error) {
        console.error(error);
    }
};

export default config;
