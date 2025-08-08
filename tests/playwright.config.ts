import {defineConfig, devices} from '@playwright/test';

require("dotenv").config()

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    reporter: [
        ['junit', { outputFile: 'test-results/e2e-junit-results.xml'}],
        ['html', { open: 'never' }]
    ],
    use: {
        baseURL: process.env.TARGET_ENVIRONMENT,
        ignoreHTTPSErrors: true,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure'
    },
    projects: [
        /*{
            name: 'setup',
            testMatch: 'setup/*.setup.ts'
        },*/
        {
            name: 'tests',
            testMatch: 'tests/**/*.spec.ts',
            //dependencies: ['setup']
        }
    ]
});
