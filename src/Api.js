import react from 'react';

const URL = 'http://192.168.66.115:8000';

export default {
    getQuest: async () => {
        console.log("URL: ", URL);
        const req = await fetch(`${URL}/quest`);
        const json = await req.json();
        console.log(json);

        return json;
    }

};