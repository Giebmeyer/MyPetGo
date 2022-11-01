import { Model } from '@nozbe/watermelondb';
import { field, readonly, date } from '@nozbe/watermelondb/decorators';

export default class UserModel extends Model {
    static table = 'Usuarios'

    @field('IdOnline')
    IdOnline!: string;

    @field('Nome')
    Nome!: string;

    @field('Usuario')
    Usuario!: string;

    @field('Senha')
    Senha!: string;

    @field('Token')
    Token!: string;

    @field('created_at')
    created_at!: number;

    @field('updated_at')
    updated_at!: number;

}