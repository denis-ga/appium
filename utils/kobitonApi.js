require('dotenv').config();
const { promises }  = require('fs');
const path = require('path');
const axios = require('axios');

const getdevices = async () => {
    const filePath = path.join(__dirname, 'deviceList.json');
    const deviceList = await axios.get('https://api.kobiton.com/v1/devices', {
        headers: {
            Authorization: `Basic ${process.env.KOBITON_API_KEY}`,
            Accept:'application/json'
        }
    });

    const acticeDevices = deviceList.data.cloudDevices.filter(devices =>
        devices.state === 'ACTIVATED'
        && devices.platformName === 'Android'
        && devices.deviceHealthInfo.network === 'Reachable'
        && parseInt(devices.platformVersion) >= 9 && devices.support.appiumDisabled === false && devices.isOnline === true
        && devices.isHealthy === true && devices.isReserved === false && devices.isBooked === false && devices.isHidden === false
        && devices.telephony?.mobileDataState !== 'Disconnected');

    acticeDevices.sort((a, b) => parseInt(b.platformVersion) - parseInt(a.platformVersion));

    let list = [];
    for (let i = 0, k = 0; i< acticeDevices.length; i++, k++){
        // let dev = acticeDevices[Math.floor(Math.random() * acticeDevices.length)];
        let device = {
            sessionName:        process.env.SESSION_NAME,
            sessionDescription: '',
            deviceOrientation:  'portrait',
            captureScreenshots: true,
            useConfiguration: '',
            app:                process.env.KOBITON_APP,
            deviceGroup:        'KOBITON',
            deviceName:         acticeDevices[i].deviceName,
            platformVersion:    acticeDevices[i].platformVersion,
            platformName:       'Android',
            noReset: false,
            fullReset: true,
            autoAcceptAlerts:   true,
        };
        list.push(device);

        if (k >= 10){
            break;
        }
    }

    await promises.writeFile(filePath, JSON.stringify(list));

    console.log('DeviceList created');
};

getdevices();