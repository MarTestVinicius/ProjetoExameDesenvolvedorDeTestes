import { test, expect } from '@playwright/test';
import { PessoasPage } from '../../page/pessoas.page.js'; // Ajuste o caminho conforme a estrutura do seu projeto
import  Usuarios_Api  from '../../services/usuarios.api.js'
require('dotenv').config();


test.describe('Testes de Interface - Operações em Pessoas', () => {
  // Declaramos a variável fora dos testes para que todos tenham acesso a ela
  let pessoasPage;   

  test.beforeEach(async ({ page, request }) => {
    // Instancia a Page Object e faz a preparação inicial
    pessoasPage = new PessoasPage(page, request);
    await pessoasPage.acessarPagina();
    await pessoasPage.iniciarAdicaoPessoa();
  });

  test('Validar erro de limite de caracteres no campo Nome', async ({ page }) => {
    const nomeMuitoLongo = 'Marcus Vinicius + '.repeat(20);

    // Já não precisamos de aceder à página ou clicar em "Adicionar", vamos direto à ação
    await pessoasPage.preencherNome(nomeMuitoLongo);
    await pessoasPage.clicarSubmit();

    // Validação da mensagem de erro
    const erroMensagem = page.getByText('Nome deve ter no máximo 200 caracteres');
    await expect(erroMensagem).toBeVisible();
  });

  test('Validar obrigatoriedade de campos Nome e Data nascimento', async ({ page }) => {
    // Limpar os campos utilizando os métodos da Page Object
    await pessoasPage.preencherDataNascimento('');
    await pessoasPage.preencherNome('');
    await pessoasPage.salvar();

    // Validação das mensagens de erro
    const erroNome = page.getByText('Nome é obrigatório');
    await expect(erroNome).toBeVisible();

    const erroData = page.getByText('Data de nascimento é obrigatória.');
    await expect(erroData).toBeVisible();
  });

  test('Validar Datas Futuras', async ({ page }) => {
    // Lógica para gerar a data futura
    const data = new Date();
    data.setDate(data.getDate() + 5);
    const dataFormatada = data.toISOString().split('T')[0];

    // Preenchimento
    await pessoasPage.preencherNome('Usuario_Teste');
    await pessoasPage.preencherDataNascimento(dataFormatada);
    await pessoasPage.salvar();
    console.log(dataFormatada);

    // Validação da mensagem de erro
    const mensagemErro = page.getByRole('status', { hasText: 'Data de nascimento não pode ser no futuro.' });
    await expect(mensagemErro).toBeVisible();
  });

  test('inserir pessoas com sucesso', async ({ page, request }) => {
    await pessoasPage.preencherNome(process.env.NAME_REMOVE);
    await pessoasPage.preencherDataNascimento('1991-08-25');
    await pessoasPage.salvar();
    await pessoasPage.validarUsuarioNovoSalvoAPI(process.env.NAME_REMOVE);
    await pessoasPage.validarTelausuarioNovo(process.env.NAME_REMOVE);
    await pessoasPage.removerUsuarioApi(process.env.NAME_REMOVE);
  });
});