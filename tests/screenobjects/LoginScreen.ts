import AppScreen from './AppScreen';
import Gestures from '../helpers/Gestures';

class LoginScreen extends AppScreen {
    constructor () {
        super('~Login-screen');
    }

    private get loginContainerButton () {return $('~button-login-container');}
    private get signUpContainerButton () {return $('~button-sign-up-container');}
    private get loginButton () {return $('~button-LOGIN');}
    private get signUpButton () {return $('~button-SIGN UP');}
    private get email () {return $('~input-email');}
    private get password () {return $('~input-password');}
    private get repeatPassword () {return $('~input-repeat-password');}
    private get biometricButton () {return $('~button-biometric');}

    private get gigyaLogin () { return $('//*[@resource-id="gigya-loginID-75579930407612940"]'); }
    private get gigyaPassword () { return $('//*[@resource-id="gigya-password-32665041627364124"]'); }
    private get gigyaSubmit () { return $('//android.widget.Button[@text="Submit"]'); }

    get FacebookButton () { return $('//*[@resource-id="gigya-custom-social-logins-container"]/android.view.View[@index=0]'); }
    get noneAboveFB () { return $('//*[@resource-id="com.google.android.gms:id/cancel"]'); }
    get usernameFB () { return $('//android.widget.EditText[@content-desc="Username"]'); }
    get passwordFB () { return $('//android.widget.EditText[@content-desc="Password"]'); }
    get loginFB () { return $('//android.view.ViewGroup[@content-desc="Log In"]'); }
    get anotherAccountFB () { return $('(//*[@class=\'android.widget.LinearLayout\'][@index=4])/android.widget.LinearLayout[@index=0][@clickable=\'true\']'); }

    get GoogleButton () { return $('//*[@resource-id="gigya-custom-social-logins-container"]/android.view.View[@index=1]'); }
    private get AppleButton () { return $('//*[@resource-id="gigya-custom-social-logins-container"]/android.view.View[@index=2]'); }

    async isBiometricButtonDisplayed () {
        return this.biometricButton.isDisplayed();
    }

    async tapOnLoginContainerButton(){
        await this.loginContainerButton.click();
    }

    async tapOnSignUpContainerButton(){
        await this.signUpContainerButton.click();
    }

    async tapOnBiometricButton(){
        await this.biometricButton.click();
    }

    async submitLoginForm({ username, password }:{username:string; password:string;}) {
        await this.email.setValue(username);
        await this.password.setValue(password);

        if (await driver.isKeyboardShown()) {
            /**
             * Normally we would hide the keyboard with this command `driver.hideKeyboard()`, but there is an issue for hiding the keyboard
             * on iOS when using the command. You will get an error like below
             *
             *  Request failed with status 400 due to Error Domain=com.facebook.WebDriverAgent Code=1 "The keyboard on iPhone cannot be
             *  dismissed because of a known XCTest issue. Try to dismiss it in the way supported by your application under test."
             *  UserInfo={NSLocalizedDescription=The keyboard on iPhone cannot be dismissed because of a known XCTest issue. Try to dismiss
             *  it in the way supported by your application under test.}
             *
             * That's why we click outside of the keyboard.
             */
            await $('~Login-screen').click();
        }
        // On smaller screens there could be a possibility that the button is not shown
        await Gestures.checkIfDisplayedWithSwipeUp(await this.loginButton, 2);
        await this.loginButton.click();
    }

    async submitSignUpForm({ username, password }:{username:string; password:string;}) {
        await this.email.setValue(username);
        await this.password.setValue(password);
        await this.repeatPassword.setValue(password);

        if (await driver.isKeyboardShown()) {
            /**
             * Normally we would hide the keyboard with this command `driver.hideKeyboard()`, but there is an issue for hiding the keyboard
             * on iOS when using the command. You will get an error like below
             *
             *  Request failed with status 400 due to Error Domain=com.facebook.WebDriverAgent Code=1 "The keyboard on iPhone cannot be
             *  dismissed because of a known XCTest issue. Try to dismiss it in the way supported by your application under test."
             *  UserInfo={NSLocalizedDescription=The keyboard on iPhone cannot be dismissed because of a known XCTest issue. Try to dismiss
             *  it in the way supported by your application under test.}
             *
             * That's why we click outside of the keyboard.
             */
            await $('~Login-screen').click();
        }
        // On smaller screens there could be a possibility that the button is not shown
        await Gestures.checkIfDisplayedWithSwipeUp(await this.signUpButton, 2);
        await this.signUpButton.click();
    }

    async IDPLogin({ username, password }:{username:string; password:string;}) {
        await this.gigyaLogin.setValue(username);
        await this.gigyaPassword.setValue(password);
        await this.gigyaSubmit.click();
    }
}

export default new LoginScreen();
