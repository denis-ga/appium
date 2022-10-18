require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const { getKeyValue, saveKeyValue } = require('./storage.service');

const getApplication = async (endpoint, app) => {
    const { data } = await axios({
        method: 'get',
        url: endpoint,
        headers: { 'X-API-Token' : process.env.APPCENTER_API_TOKEN }
    });

    let filename = new URL(data.download_url).pathname.split('/').pop();
    const lastBuild = await getKeyValue(app) || 0;

    if (data.id > lastBuild) {
        await saveKeyValue(app, data.id);
        await saveKeyValue(`${app}status`, true);
        await saveKeyValue(`${app}name`, filename);

        downloadFile(data.download_url, `./apps/${filename}`);
    } else {
        await saveKeyValue(`${app}status`, false);
        console.log(`${app} No new version found`);
    }
};

const downloadFile = (fileUrl, outputLocationPath) => {
    const writer = fs.createWriteStream(outputLocationPath);

    return axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
    }).then(response => {
        return new Promise((resolve, reject) => {
            console.log(`${outputLocationPath} download is started`);
            response.data.pipe(writer);
            let error = null;

            writer.on('error', err => {
                error = err;
                writer.close();
                reject(err);
            });
            writer.on('close', () => {
                if (!error) {
                    console.log('Download is finished : ' + writer.path);
                    resolve(true);
                }
            });
        });
    });
};

const getAllApps = async () => {
    let Apps = ['UCL', 'UCL-1', 'UEL', 'UEL-1'];
    let promiseApp = [];

    for (const app of Apps){
        const lastRelease = `https://api.appcenter.ms/v0.1/apps/online-development-2jmn/${app}/releases/latest?is_install_page=true`;

        promiseApp.push(await getApplication(lastRelease, app));
    }

    await Promise.allSettled(promiseApp);
};

getAllApps();

module.exports = { getApplication };