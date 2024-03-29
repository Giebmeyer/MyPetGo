import react from 'react';

const URL = 'http://192.168.66.129:8000';

export default {

    postToken: async (token) => {
        const req = await fetch(`${URL}/validateToken/${token}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })

        const json = await req.json();
        console.log("response: ", json, " json.token: ", json.Token)
        return json.Token
    },

    postUser: async (user, password) => {
        const req = await fetch(`${URL}/Login/${user}/${password}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const json = await req.json();
        return json;
    },

    getQuest: async () => {
        const req = await fetch(`${URL}/quest`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();

        return json;
    },

    getAnnotations: async (QuestId) => {
        const req = await fetch(`${URL}/getAnnotation/${QuestId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.json();

        return json;
    },

    postAnnotation: async (idQuest, Annotation) => {
        console.log("API => ", idQuest, "Status => ", Annotation)
        const req = await fetch(`${URL}/postAnnotation/${idQuest}/${Annotation}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const json = await req.json();
        return json;
    },

    postQuest: async (id, status) => {
        const req = await fetch(`${URL}/quest/StatusModify/${id}/${status}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const json = await req.json();
        return json;
    }



};