require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

const getApplication = async (endpoint) => {
    const { data } = await axios({
        method: 'get',
        url: endpoint,
        headers: { 'X-API-Token' : process.env.APPCENTER_API_TOKEN }
    });

    let filename = new URL(data.download_url).pathname.split('/').pop();

    downloadFile(data.download_url, `./apps/${filename}`);
};

const downloadFile = (fileUrl, outputLocationPath) => {
    const writer = fs.createWriteStream(outputLocationPath);

    return axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
    }).then(response => {
        return new Promise((resolve, reject) => {
            response.data.pipe(writer);
            let error = null;

            const len = parseInt(response.headers['content-length'], 10);
            let downloaded = 0;
            let percent = 0;

            response.data.on('data', (chunk) => {
                writer.write(chunk);
                downloaded += chunk.length;
                percent = (100.0 * downloaded / len).toFixed(2);
                process.stdout.write(`Downloading ${percent}% ${downloaded} bytes\r`);
            });

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

        promiseApp.push(await getApplication(lastRelease));
    }

    await Promise.allSettled(promiseApp);
};

getAllApps();

module.exports = { getApplication };