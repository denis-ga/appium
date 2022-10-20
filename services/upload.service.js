const request = require('request');
const fs = require('fs');
const btoa = require('btoa');
const dotenv = require('dotenv');
dotenv.config();
const { getKeyValue, saveKeyValue } = require('./storage.service');

const username =  process.env.KOBITON_USER;
const apikey =  process.env.KOBITON_KEY;

const appID = process.env.APP_ID;

const base64EncodedBasicAuth = btoa(`${username}:${apikey}`);
const headers = {
    'Authorization': `Basic ${base64EncodedBasicAuth}`,
    'Content-Type':'application/json',
    'Accept':'application/json'
};

const main = async (app) => {
    try {
        if (await getKeyValue(`${app}status`)) {
            const filename =  await getKeyValue(`${app}name`);
            const stats = fs.statSync(`./apps/${filename}`);
            const kobitonFilename = process.env.APP_FILE_NAME + filename;

            const inputBody = {
                filename: kobitonFilename
            };

            if (appID) {
                inputBody.appId = appID;
            }

            console.log('Step 1: Generate Upload URL');
            const getUrl = await new Promise((resolve, reject) => {
                request({
                    url: 'https://api.kobiton.com/v1/apps/uploadUrl',
                    json: true,
                    method: 'POST',
                    body: inputBody,
                    headers: headers
                }, function (err, response, body) {

                    if (err || response.statusCode != 200) {
                        console.log(err);
                        return reject(err);
                    }
                    console.log('Response body:', body);
                    console.log('Uploading...');
                    resolve(body);
                });
            });

            console.log('Step 2: Upload File To S3');
            await new Promise((resolve, reject) => {
                fs.createReadStream(`./apps/${filename}`).pipe(
                    request(
                        {
                            method: 'PUT',
                            url: `${getUrl.url}`,
                            headers: {
                                'Content-Length': stats.size,
                                'Content-Type': 'application/octet-stream',
                                'x-amz-tagging': 'unsaved=true'
                            }
                        },
                        function (err, res, body) {
                            if (err) {
                                console.log('Upload file Error', err);
                                return reject(err);
                            }
                            console.log('Create App Version ...');
                            resolve(body);
                        }
                    )
                );
            });

            console.log('Step 3: Create Application Or Version');
            await new Promise((resolve, reject) => {
                request({
                    url: 'https://api.kobiton.com/v1/apps',
                    json: true,
                    method: 'POST',
                    body: {
                        'filename': `${kobitonFilename}`,
                        'appPath': `${getUrl.appPath}`
                    },
                    headers: headers
                }, function (err, response, body) {
                    if (err) {
                        console.error('Error:', err);
                        return reject(err);
                    }
                    console.log('Response body:', body);
                    saveKeyValue(`${app}status`, false);
                    resolve(body);
                    console.log('Done');
                });
            });
        } else {
            console.log('App is latest version');
        }
    } catch (error) {
        console.log('ERROR', error);
    }
};

const uploadAllApps = async () => {
    let Apps = ['Gaming', 'UCL', 'UCL-1', 'UEL', 'UEL-1'];

    let uplApps = [];

    for (const app of Apps){
        uplApps.push(await main(app));
    }

    await Promise.allSettled(uplApps);
};

uploadAllApps();