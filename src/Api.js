import react from 'react';

const BASE_API = 'http://allugofrases.herokuapp.com';

export default {
    getQuest: async () => {
        const req = await fetch(`${BASE_API}/frases`);
        const json = await req.json();
        return json;
    }

};