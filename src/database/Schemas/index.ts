import { appSchema } from '@nozbe/watermelondb';

import { userSchema } from './userSchema';
import { questSchema } from './questSchema';
import { questAnnotationSchema } from './questAnnotationSchema';
import { andressSchema } from './andressSchema';
import { petSchema } from './petSchema';
import { clientSchema } from './clientSchema';
import { allSchema } from './allSchema';

export default appSchema({
    version: 1,
    tables: [
        userSchema,
        questSchema,
        questAnnotationSchema,
        andressSchema,
        petSchema,
        clientSchema,
        allSchema
    ]
});