
const path = require('path');

exports.config = {
    runner: 'local',
    port: 4723,

    specs: ['./test/specs/**/*.js'],
    exclude: [],

    maxInstances: 1,

    capabilities: [
        {
            platformName: 'Android',
            'appium:deviceName': 'nightwatch-android-11',
            'appium:udid': 'emulator-5554',
            'appium:automationName': 'UiAutomator2',

            'appium:app': path.join(
                __dirname,
                'apps',
                'sauce-demo.apk'
            ),

            'appium:appPackage': 'com.swaglabsmobileapp',
            'appium:appActivity': 'com.swaglabsmobileapp.MainActivity',
            'appium:appWaitActivity': 'com.swaglabsmobileapp.MainActivity',
            'appium:appWaitDuration': 30000,

            'appium:autoGrantPermissions': true,
            'appium:noReset': false,
            'appium:newCommandTimeout': 120
        }
    ],

    logLevel: 'info',
    bail: 0,

    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 2,

    services: ['appium'],

    framework: 'mocha',

    reporters: [
        'spec',
        [
            'allure',
            {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false
            }
        ]
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 120000,
        retries: 0
    },

    before: async function () {
        console.log('======================================');
        console.log('SAUCE DEMO MOBILE AUTOMATION');
        console.log('Android Emulator: nightwatch-android-11');
        console.log('======================================');
    },

    beforeTest: async function (test) {
        console.log(`START TEST: ${test.title}`);
    },

    afterTest: async function (test, context, { passed }) {
        console.log(`${passed ? 'PASSED' : 'FAILED'}: ${test.title}`);

        if (!passed) {
            const fs = require('fs');
            const screenshotDir = path.join(__dirname, 'screenshots');

            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir, { recursive: true });
            }

            const filename = `failed-${Date.now()}.png`;

            await browser.saveScreenshot(
                path.join(screenshotDir, filename)
            );
        }
    },

    after: async function () {
        console.log('======================================');
        console.log('SAUCE DEMO TEST EXECUTION FINISHED');
        console.log('======================================');
    }
};
