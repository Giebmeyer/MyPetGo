import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';
import { relation } from '@nozbe/watermelondb/decorators'

export default class AllModel extends Model {
    static table = 'All'

    @field('IdOnline')
    IdOnline!: string;

    @field('Cliente_Nome')
    Cliente_Nome!: string;

    @field('Telefone')
    Usuario!: string;

    @field('CPF')
    Senha!: string;

    @field('Email')
    Token!: string;


    @field('Pet_Nome')
    Pet_Nome!: string;

    @field('Especie')
    Especie!: string;

    @field('Porte')
    Porte!: string;


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


    @field('Observacao')
    Observacao: string;

    @field('Tipo')
    Tipo!: string;

    @field('Status')
    Status!: string;

    @field('FotoEntrega')
    FotoEntrega: string;

    @field('FotoColeta')
    FotoColeta: string;


    @field('created_at')
    created_at!: number;

    @field('updated_at')
    updated_at!: number;
}