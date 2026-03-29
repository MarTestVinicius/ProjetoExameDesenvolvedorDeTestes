import { test, expect } from '@playwright/test';
import { atualizarUsuario, gerarUsuario, gerarUsuarioMax, validarDadosBuscarUsuario } from '../../utils/util';
import Usuarios_Api from '../../services/usuarios.api';



const pessoas_page_default_value = 1;
const pessoas_pagesize_default_value = 20;
const version_default = '1';
const pessoas_search = null;


test.describe('Operações em usuários', () => {
  let id_user;
  let usuarios_Api;
  let name_user;
  let data_nascimento_user;
  let idade_user;

  // ANTES de cada teste: Cria um usuário para garantir que exista um usuário para os testes de GET, PUT e DELETE
  test.beforeEach(async ({ request }) => {
    usuarios_Api = new Usuarios_Api(request);
    const payload = gerarUsuario();
    const response = await usuarios_Api.criarUsuario(version_default, payload);
    const body = await response.json();
    id_user = body.id;
    name_user = body.nome;
    data_nascimento_user = body.dataNascimento;
    idade_user = body.idade;
  });

  // DEPOIS de cada teste: Deleta o usuário, garantindo que o banco não cresça
  test.afterEach(async () => {
    if (id_user) {
      await usuarios_Api.deletarUserPorId(id_user, version_default);
    }
  });

  test('Obter a lista de todas as pessoas - GET', async ({ request }) => {
    //fazer o request para API
    const response = await usuarios_Api.listarUsuarios(version_default, pessoas_pagesize_default_value, pessoas_page_default_value, pessoas_search);

    //reponse da Api
    const body = await response.json();

    //validação de propriedades
    expect(response.status()).toBe(200);
    expect(body).toHaveProperty('items');
    expect(body).toHaveProperty('totalCount');
    expect(body).toHaveProperty('page');
    expect(body).toHaveProperty('pageSize');
    expect(body).toHaveProperty('totalPages');
  });


  test('Criar usuario - POST - validação preenchimento correto da idade', async ({ request }) => {
    //criação das informações do usuário, pegar data atual e fazer o request para API
    const payload = gerarUsuario();
    const hoje = new Date();
    const response = await usuarios_Api.criarUsuario(version_default, payload);

    //reponse da Api
    const body = await response.json();

    //calculos para validação da idade esperada para o usuário
    const idade_user_calc = new Date(body.dataNascimento);
    let idade_anos = hoje.getFullYear() - idade_user_calc.getFullYear();
    const idade_mes = hoje.getMonth() - idade_user_calc.getMonth();
    if (idade_mes < 0 || (idade_mes === 0 && hoje.getDate() < idade_user_calc.getDate())) {
      idade_anos--;
    }

    //Validações
    expect(response.status()).toBe(201);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('nome');
    expect(body).toHaveProperty('dataNascimento');
    expect(body).toHaveProperty('idade');
    expect(body.idade).toBe(idade_anos);

  });

  test('Criar usuario - POST - validar quantidade máxima do nome do usuário', async ({ request }) => {
    //gerar informações de usuário com nome maior que o esperado e fazer o request para API
    const payload = gerarUsuarioMax();
    const response = await usuarios_Api.criarUsuario(version_default, payload);

    //validação
    expect(response.status()).toBe(400);

  });

  test('Buscar usuario Id - GET', async ({ request }) => {
    //fazer o request para API
    const response = await usuarios_Api.buscarUsuarioPorId(version_default, id_user);

    //reponse da Api
    const body = await response.json();

    //Validações para verificar informações
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('nome');
    expect(body).toHaveProperty('dataNascimento');
    expect(body).toHaveProperty('idade');
    expect(body.id).toBe(id_user);
    expect(body.nome).toBe(name_user);
    expect(body.dataNascimento).toBe(data_nascimento_user);
    expect(body.idade).toBe(idade_user);
  });

  test('Atualizar usuario Id - Put', async ({ request }) => {
    //gerar informações para atualizar o usuário e fazer o request para API
    const payload = atualizarUsuario();
    const response = await usuarios_Api.atualizarUsuarioPorId(id_user, version_default, payload);

    //validação do código de retorno
    expect(response.status()).toBe(204);


    //Validação de conteúdo foi atualizado
    const response_atualizado = await usuarios_Api.buscarUsuarioPorId(version_default, id_user);

    //reponse da Api para verificar o conteudo foi atualizado
    const body_atualizado = await response_atualizado.json();
    expect(body_atualizado.nome).not.toBe(name_user);
    expect(body_atualizado.dataNascimento).not.toBe(data_nascimento_user);
  });

  test('Deletar usuario Id - DELETE', async ({ request }) => {
    //fazer o request para API
    const response = await usuarios_Api.deletarUserPorId(id_user, version_default);

    //validação
    expect(response.status()).toBe(204);

    //Validação de conteúdo foi atualizado
    const validar_response_delete = await usuarios_Api.buscarUsuarioPorId(version_default, id_user);

    // validar que o usuário não está mais existente
    expect(validar_response_delete.status()).toBe(404);
  });

});

test('listar usuários/ mock da API', async ({ page }) => {
  //Configura o Mock 
  await page.route('http://localhost:5000/api/v1/Pessoas?page=1&pageSize=20', async route => {

    const json = {
      "items": [
        {
          "id": "019bf727-a20b-79ed-995d-272c71a8a78e",
          "nome": "Teste_user1",
          "dataNascimento": "2026-01-14T00:00:00",
          "idade": 0
        },
        {
          "id": "019bf727-b8df-7b00-bd5e-d2a6afeb109e",
          "nome": "Teste_user2",
          "dataNascimento": "2016-01-01T00:00:00",
          "idade": 10
        },
        {
          "id": "019bf727-cfbe-7a0a-9c1d-3e006ea19fe9",
          "nome": "Teste_user3",
          "dataNascimento": "2026-01-08T00:00:00",
          "idade": 0
        },
        {
          "id": "019bf727-8afd-7378-9ee4-b2ec92b1f28f",
          "nome": "Teste_user3",
          "dataNascimento": "2025-12-29T03:00:00",
          "idade": 0
        }
      ],
      "totalCount": 35,
      "page": 1,
      "pageSize": 4,
      "totalPages": 2
    };

    await route.fulfill({
      status: 200, // Alterado para 200 para sucesso
      contentType: 'application/json',
      body: JSON.stringify(json)
    });
  });

  //reponse da pagina
  const response = await page.goto('http://localhost:5000/api/v1/Pessoas?page=1&pageSize=20');
  const body = await response.json();

  //Validar o método de validação de dados do usuário
  await validarDadosBuscarUsuario(response, body);
});

