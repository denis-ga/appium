import { join } from 'path';
import config from '../wdio.shared.local.appium.conf';
import * as dotenv from 'dotenv';
dotenv.config();
const { Reporter } = require('@reportportal/agent-js-webdriverio');

const configRP = {
    token: process.env.PORTAL_TOKEN,
    endpoint: process.env.PORTAL_ENDPOINT,
    project: process.env.PORTAL_PROJECT,
    launch: process.env.SESSION_NAME,
    mode: 'DEFAULT',
    debug: false,
    description: '',
    attributes: [],
    attachPicturesToLogs: false,
    rerun: false,
    rerunOf: 'launchUuid of already existed launch',
    cucumberNestedSteps: false,
    skippedIssue: true,
};

config.reporters.push([Reporter, configRP]);

// ============
// Specs
// ============
config.specs = [
    './tests/specs/**/ucl*.spec.ts',
];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
    {
        // The defaults you need to have in your config
        platformName: 'Android',
        maxInstances: 1,
        // 'appium:udid': 'emulator-5554',
        'appium:deviceId': 'f3843b6',
        // For W3C the appium capabilities need to have an extension prefix
        // http://appium.io/docs/en/writing-running-appium/caps/
        // This is `appium:` for all Appium Capabilities which can be found here
        // 'appium:deviceName': 'Pixel 2 API 29',
        'appium:deviceName': 'Xiaomi Redmi Note 7',
        'appium:platformVersion': '10',
        'appium:orientation': 'PORTRAIT',
        'appium:automationName': 'UiAutomator2',
        // The path to the app
        'appium:app': join(process.cwd(), './apps/app-ucl-hockeyappUcl-beta.apk'),
        // 'appium:appPackage': 'com.uefa.ucl.hockeyapp',
        // 'appium:appActivity': 'com.uefa.ucl.ui.MainActivity',
        // @ts-ignore
        // 'appium:appWaitActivity': 'com.uefa.gaminghub.MainActivity',
        'appium:newCommandTimeout': 240,
    },
];

exports.config = config;
