import react from 'react';

const URL = 'http://192.168.66.129:8000';

export default {

    getClients: async() => {
        const req = await fetch(`${URL}/getClients`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const json = await req.json();
        return json;
    },

    getUsers: async() => {
        const req = await fetch(`${URL}/getUsers`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const json = await req.json();
        return json;
    },

    getPets: async() => {
        const req = await fetch(`${URL}/getPets`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        const json = await req.json();
        return json;
    },



    getQuest: async () => {
        const req = await fetch(`${URL}/getQuests`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();

        return json;
    },

    getAnnotations: async () => {
        const req = await fetch(`${URL}/getAnnotations`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();

        return json;
    },

    getAndress: async () => {
        const req = await fetch(`${URL}/getAndress`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();

        return json;
    },


};