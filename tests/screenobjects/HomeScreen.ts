import AppScreen from './AppScreen';

class HomeScreen extends AppScreen {
    constructor () {
        super('~Home-screen');
    }

    private get letsButton () { return $('//*[contains(@text, \'start\')]'); }
    // com.uefa.ucl.hockeyapp:id/privacyLetsStartButton

    private get mainMenu () { return $('~Navigate up'); }
    private get loginButtonGaming () { return $('//*[@resource-id="com.uefa.eurofantasy.adhoc:id/menu_action_sign_in"]'); }
    get TitleGaming () { return $('//*[@resource-id="com.uefa.eurofantasy.adhoc:id/title"]'); }   //UEFA GAMING
    get profileHeaderGaming () { return $('(//*[@class=\'android.widget.FrameLayout\'][@index=0][@clickable=\'true\'])/android.widget.LinearLayout/android.widget.TextView'); }

    private get skipButtonUCL () { return $('//*[@resource-id="com.uefa.ucl.hockeyapp:id/action_text_button"]'); }
    get profileButtonUCL () { return $('//*[@resource-id="com.uefa.ucl.hockeyapp:id/action_profile"]'); }
    private get loginButtonUCL () { return $('//*[@resource-id="com.uefa.ucl.hockeyapp:id/login_btn"]'); }
    get profileHeaderUCL () { return $('//*[@resource-id="com.uefa.ucl.hockeyapp:id/profile_header_name"]'); }

    private get skipButtonUEL () { return $('//*[@resource-id="com.uefa.uel.hockeyapp:id/action_text_button"]'); }
    get profileButtonUEL () { return $('//*[@resource-id="com.uefa.uel.hockeyapp:id/action_profile"]'); }
    private get loginButtonUEL () { return $('//*[@resource-id="com.uefa.uel.hockeyapp:id/login_btn"]'); }
    get profileHeaderUEL () { return $('//*[@resource-id="com.uefa.uel.hockeyapp:id/profile_header_name"]'); }

    private get skipButtonNTC () { return $('//*[@resource-id="com.uefa.euro2016.beta:id/action_text_button"]'); }
    get profileButtonNTC () { return $('//*[@resource-id="com.uefa.euro2016.beta:id/action_profile"]'); }
    private get loginButtonNTC () { return $('//*[@resource-id="com.uefa.euro2016.beta:id/login_btn"]'); }
    get profileHeaderNTC () { return $('//*[@resource-id="com.uefa.euro2016.beta:id/profile_header_name"]'); }

    get GooglePassReject () { return $('//*[@resource-id="com.google.android.gms:id/credential_save_reject"]'); }
    get GooglePassConfirm () { return $('//*[@resource-id="com.google.android.gms:id/credential_save_confirm"]'); }

    async tapLetsPlay() {
        await this.letsButton.click();
    }

    async goingToLogin(appName: string) {
        switch (appName){
        case 'UCL':
            await this.skipButtonUCL.click();
            await this.profileButtonUCL.click();
            await this.loginButtonUCL.click();
            break;
        case 'UEL':
            await this.skipButtonUEL.click();
            await this.profileButtonUEL.click();
            await this.loginButtonUEL.click();
            break;
        case 'NTC':
            await this.skipButtonNTC.click();
            await this.profileButtonNTC.click();
            await this.loginButtonNTC.click();
            break;
        case 'Gaming':
            await this.mainMenu.click();
            await this.loginButtonGaming.click();
            break;
        }
    }

    async clickMainMenu() {
        await this.mainMenu.click();
    }
}

export default new HomeScreen();
