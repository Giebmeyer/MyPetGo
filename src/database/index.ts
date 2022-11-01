import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import schemas from "./Schemas";

import UserModel from "./Models/userModel";
import ClientModel from "./Models/clientModel";
import PetModel from "./Models/petModel";
import QuestAnnotationModel from "./Models/questAnnotationModel";
import QuestModel from "./Models/questModel";
import AndressModel from "./Models/andressModel";
import AllModel from "./Models/allModel";


const adapter = new SQLiteAdapter({
    dbName: 'MyPetGoDB',
    schema: schemas
});

export const database = new Database({
    adapter,
    modelClasses: [
        UserModel,
        ClientModel,
        PetModel,
        QuestModel,
        QuestAnnotationModel,
        AndressModel,
        AllModel,
    ],
})

