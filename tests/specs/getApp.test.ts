import { test, expect, Page, BrowserContext } from '@playwright/test';
const { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } = require('../../services/storage.service');

test.describe.serial('Download and Upload', () => {
    test('Download file', async ({ page }) => {
        await page.goto('https://install.appcenter.ms/orgs/online-development-2jmn/apps/gaming-hub-android-adhoc/distribution_groups/all-users-of-gaming-hub-android-adhoc');

        const appDate = await getKeyValue('appDate');
        const element = await page.locator('//*[@id="app"]/div/div/div/div[2]/div[2]/div[2]/div/div[1]/div[1]/div[2]/div/div[1]/div[1]/div[1]').innerText().valueOf();
        console.log(element);

        if (appDate == undefined || appDate != element){

            await page.locator('button:has-text("Download")').click();

            const [download] = await Promise.all([
                page.waitForEvent('download')
            ]);

            console.log('Путь: ', await download.path());

            await download.saveAs(`./apps/${download.suggestedFilename()}`);
            await download.delete();

            await saveKeyValue(TOKEN_DICTIONARY.appDate, element);
            await saveKeyValue(TOKEN_DICTIONARY.status, true);
        } else {
            await saveKeyValue(TOKEN_DICTIONARY.status, false);
        }
    });
});