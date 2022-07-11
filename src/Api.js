import react from 'react';

const URL = 'http://192.168.0.4:8000';

export default {
    getQuest: async () => {
        const req = await fetch(`${URL}/quest`);
        const json = await req.json();
        return json;
    }


};