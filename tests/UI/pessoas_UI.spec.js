import { test, expect } from '@playwright/test';

test('Validar erro de limite de caracteres no campo Nome', async ({ page }) => {

  // Navegar até a página da aplicação e ir para página de usuário
  await page.goto('/pessoas');
  await page.getByRole('button', { name: 'Adicionar Pessoa' }).click();

  //Gerar um texto com mais de 200 caracteres
  const nomeMuitoLongo = 'Marcus Vinicius + '.repeat(20);

  //Preencher o campo com ID nome longo feito anteriormente
  await page.locator('input#nome').fill(nomeMuitoLongo);

  // Clicar no campo Submit
  await page.locator('button[type="submit"]').click();

  // 5. Validar a mensagem de erro específica
  const erroMensagem = page.getByText('Nome deve ter no máximo 200 caracteres');

  // Verifica se está visível na tela
  await expect(erroMensagem).toBeVisible();
});

test('Validar obrigatoriedade de campos Nome e Data nascimento', async ({ page }) => {

  // Navegar até a página da aplicação e ir para página de usuário
  await page.goto('/pessoas');
  await page.getByRole('button', { name: 'Adicionar Pessoa' }).click();

  // Limpar o campo de data e Limpar o conteúdo
  await page.locator('input[type="date"]#dataNascimento').fill('');

  // Limpar o campo nome
  await page.locator('input#nome').fill('');

  // Clicar no botão de Submit com o nome "Salvar"
  await page.getByRole('button', { name: 'Salvar' }).click();

  // Validação da mensagem de erro para o Nome (documento PessoaDto.cs)
  const erroNome = page.getByText('Nome é obrigatório');
  await expect(erroNome).toBeVisible();

  // Validação da mensagem de erro para a Data (documento PessoaDto.cs)
  const erroData = page.getByText('Data de nascimento é obrigatória.');
  await expect(erroData).toBeVisible();


});

test('Validar Datas Futuras', async ({ page }) => {

  // Navegar até a página da aplicação e ir para página de usuário
  await page.goto('/pessoas');
  await page.getByRole('button', { name: 'Adicionar Pessoa' }).click();

  const data = new Date();
  data.setDate(data.getDate() + 5); // Adiciona 5 dias à data atual

  // Formata para o padrão YYYY-MM-DD exigido pelo input type="date"
  const dataFormatada = data.toISOString().split('T')[0];

  // Preencher o campo Nome
  await page.locator('input#nome').fill('Usuario_Teste');

  // Preencher o campo Data de Nascimento com a data futura
  const campoData = page.locator('input[type="date"]#dataNascimento');
  await campoData.fill(dataFormatada);

  // Clicar no botão "Salvar"
  await page.getByRole('button', { name: 'Salvar' }).click();

  // Validar mensagem de erro (documento PessoaValidation.cs)
  const mensagemErro = page.locator('div[role="status"]', {
    hasText: 'Data de nascimento não pode ser no futuro.'
  });

  await expect(mensagemErro).toBeVisible();
});

