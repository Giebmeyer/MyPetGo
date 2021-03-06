import react from 'react';

const URL = 'http://192.168.0.4:8000';

export default {

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
        json
    },

    postAnnotation: async (idQuest, Annotation) => {
        const req = await fetch(`${URL}/Quest_Annotation/${idQuest}/${Annotation}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const json = await req.json();
        return json;
    },

    putQuest: async (QuestId) => {
        const req = await fetch(`${URL}/quest/StatusModify/${QuestId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const json = await req.text();
        const FinalJson = JSON.parse(json);
        return FinalJson;
    }



};