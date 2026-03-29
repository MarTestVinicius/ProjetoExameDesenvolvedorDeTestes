import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';

export function gerarUsuario() {
    return {
        nome: faker.person.firstName(),
        dataNascimento: '1998-05-12T01:18:29.02',
    };
};

export function gerarUsuarioMax() {
    return {
        nome: 'X'.repeat(201),
        dataNascimento: '1998-05-12T01:18:29.02',
    };
};

export function atualizarUsuario() {
    return {
        nome: faker.person.firstName(),
        dataNascimento: '1990-02-25T01:18:29.02',
    };
};

export function validarDadosBuscarUsuario(response, body) {
    //Validar status
    expect(response.status()).toBe(200);

    //Valida a existência das propriedades 
    expect(body).toHaveProperty('items');
    expect(body).toHaveProperty('totalCount');
    expect(body).toHaveProperty('pageSize'); // Necessário existir para a validação abaixo

    //Validar se o valor de 'pageSize' é igual à quantidade de itens na lista
    expect(body.pageSize).toBe(body.items.length);
}