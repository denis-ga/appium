const { promises } = require('fs');

const filePath = './apps/app_data.json';

const TOKEN_DICTIONARY = {
    appVersion: 'appVersion',
    appDate: 'appDate',
    status: 'status'
};

const saveKeyValue = async (key, value) => {
    let data = {};
    if (await isExist(filePath)){
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
    }
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key, value) => {
    if (await isExist(filePath)){
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined;
};

const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (e){
        return false;
    }
};

module.exports = { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };