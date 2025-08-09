import {expect, test} from "@playwright/test";

test.describe('Log in into TYPO3 backend', () => {
    test('should be logged in', async ({ page }) => {
        await page.goto('/typo3')
        await page.getByPlaceholder('Username').fill(process.env.USERNAME)
        await page.getByPlaceholder('Password').fill(process.env.PASSWORD)
        await page.getByRole('button', { name: 'Login' }).click()

        await expect(page.locator('.t3js-topbar-button-modulemenu')).toBeVisible();
    });
});