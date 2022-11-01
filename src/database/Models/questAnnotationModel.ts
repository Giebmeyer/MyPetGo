import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';
import { relation } from '@nozbe/watermelondb/decorators'

export default class QuestAnnotationModel extends Model {
    static table = 'QuestAnnotation'
    static associations = {
        Quests: { type: 'belongs_to', key: 'Quest_id' },
      }

    @field('IdOnline')
    IdOnline!: string;

    @field('Anotacao')
    Anotacao!: string;

    @field('Excluida')
    Excluida!: string;

    @field('Sincronizado')
    Sincronizado!: string;

    @relation('Quests', 'Quest_id') 
    QuestId;

    @field('created_at')
    created_at!: number;

    @field('updated_at')
    updated_at!: number;

    
}