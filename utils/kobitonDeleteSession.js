require('dotenv').config();
const axios = require('axios');

const getdevices = async () => {
    const sessionList = await axios.get('https://api.kobiton.com/v1/sessions', {
        headers: {
            Authorization: `Basic ${process.env.KOBITON_API_KEY}`,
            Accept:'application/json'
        }
    });

    const activeSession = sessionList.data.data.filter(session =>
        session.userId === 128089 && session.state === 'START'
        && session.name === 'Automation Tests for UCL');

    for (let i = 0; i<activeSession.length; i++){
        await axios.delete(`https://api.kobiton.com/v1/sessions/${activeSession[i].id}/terminate`, {
            headers: {
                Authorization: `Basic ${process.env.KOBITON_API_KEY}`,
                Accept:'application/json'
            }
        });
    }

    console.log('All sessions terminated');
};

getdevices();