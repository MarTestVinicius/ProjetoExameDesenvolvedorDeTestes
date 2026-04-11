import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';

export function gerarUsuario() {
    return {
        nome: faker.person.firstName(),
        // Gera uma data de nascimento de uma pessoa com idade entre 18 e 65 anos
        dataNascimento: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
    };
};

export function gerarUsuarioMax() {
    return {
        nome: 'X'.repeat(201),
        // Mantemos o mesmo padrão dinâmico
        dataNascimento: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
    };
};

export function atualizarUsuario() {
    return {
        nome: faker.person.firstName(),
        // Mantemos o mesmo padrão dinâmico
        dataNascimento: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().split('T')[0],
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