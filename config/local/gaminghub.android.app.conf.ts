import { join } from 'path';
import config from '../wdio.shared.local.appium.conf';

// ============
// Specs
// ============
config.specs = [
    './tests/specs/**/gaminghub*.spec.ts',
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
        'appium:udid': 'emulator-5554',
        // For W3C the appium capabilities need to have an extension prefix
        // http://appium.io/docs/en/writing-running-appium/caps/
        // This is `appium:` for all Appium Capabilities which can be found here
        'appium:deviceName': 'Pixel 4 API 31',
        'appium:platformVersion': '12',
        'appium:orientation': 'PORTRAIT',
        'appium:automationName': 'UiAutomator2',
        // The path to the app
        'appium:app': join(process.cwd(), './apps/gaminghub-pre.apk'),
        // 'appium:appPackage': 'com.uefa.eurofantasy.adhoc',
        // 'appium:appActivity': 'com.uefa.gaminghub.SplashActivity',
        // @ts-ignore
        // 'appium:appWaitActivity': 'com.uefa.gaminghub.MainActivity',
        'appium:newCommandTimeout': 240,
    },
];

exports.config = config;
