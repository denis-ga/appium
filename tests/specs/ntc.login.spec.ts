import LoginScreen from '../screenobjects/LoginScreen';
import HomeScreen from '../screenobjects/HomeScreen';
import WebViewScreen from '../screenobjects/WebviewScreen';
import { CONTEXT_REF } from '../helpers/WebView';

describe('NTC User Login', () => {
    beforeEach(async () => {
    });

    afterEach(async () => {
        await driver.reset();
    });

    it('Login with Email and Password', async () => {
        await HomeScreen.tapLetsPlay();
        await HomeScreen.goingToLogin('NTC');
        await LoginScreen.IDPLogin({ username: 'kobiton1@mailinator.com', password: 'Test123456!' });
        await expect(await HomeScreen.profileHeaderNTC).toHaveTextContaining('Hi, kob');
    });

    // it('Login with Facebook', async () => {
    //     await LoginScreen.FacebookButton.click();
    //     await driver.pause(3000);

    //     if (await LoginScreen.anotherAccountFB.isExisting() || await LoginScreen.usernameFB.isExisting()){
    //         if (await LoginScreen.anotherAccountFB.isExisting()) {
    //             await LoginScreen.anotherAccountFB.click();
    //         }
    //         if (await LoginScreen.noneAboveFB.isDisplayed()) {
    //             await LoginScreen.noneAboveFB.click();
    //         }
    //         if (await LoginScreen.usernameFB.isExisting()) {
    //             await LoginScreen.usernameFB.setValue('lebiro1679@yubua.com');
    //             await LoginScreen.passwordFB.setValue('Test123456!');
    //             await browser.hideKeyboard();
    //             await LoginScreen.loginFB.click();
    //         }
    //     } else {
    //         await WebViewScreen.switchToContext(CONTEXT_REF.WEBVIEW);
    //         if (!await $('//button[@name="__CONFIRM__"]').isExisting()) {
    //             await $('//input[@name="email"]').setValue('lebiro1679@yubua.com');
    //             await $('//input[@name="pass"]').setValue('Test123456!');
    //             await browser.hideKeyboard();
    //             await $('//button[@name="login"]').click();
    //         }
    //         await $('//button[@name="__CONFIRM__"]').click();
    //         await WebViewScreen.switchToContext(CONTEXT_REF.NATIVE);
    //     }

    //     await driver.pause(3000);
    //     await expect(await HomeScreen.profileHeaderNTC).toHaveTextContaining('Hi, Denis');
    // });

    // it('Login with Google', async () => {
    //     await HomeScreen.tapLetsPlay();
    //     await HomeScreen.goingToLogin('NTC');
    //     await LoginScreen.GoogleButton.click();
    // });
});