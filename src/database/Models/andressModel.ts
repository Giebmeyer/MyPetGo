import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';
import { relation } from '@nozbe/watermelondb/decorators'

export default class AndressModel extends Model {
    static table = 'Enderecos'
    static associations = {
        Clientes: { type: 'belongs_to', key: 'Cliente_id' },
      }

    @field('IdOnline')
    IdOnline!: string;

    @field('Pais')
    Pais: string;

    @field('Estado')
    Estado!: string;

    @field('Cidade')
    Cidade!: string;

    @field('Bairro')
    Bairro!: string;

    @field('Rua')
    Rua!: string;

    @field('Numero')
    Numero!: string;

    @field('Complemento')
    Complemento: string;

    @field('Latitude')
    Latitude: string;

    @field('Longitude')
    Longitude: string;

    @relation('Clientes', 'Cliente_id') 
    ClienteId;

    @field('created_at')
    created_at!: number;

    @field('updated_at')
    updated_at!: number;
}