// pages/pessoas.page.js

export class PessoasPage {
  constructor(page) {
    this.page = page;
    
    // Mapeamento dos seletores
    this.btnAdicionarPessoa = page.getByRole('button', { name: 'Adicionar Pessoa' });
    this.inputNome = page.locator('input#nome');
    this.inputDataNascimento = page.locator('input[type="date"]#dataNascimento');
    this.btnSubmit = page.locator('button[type="submit"]');
    this.btnSalvar = page.getByRole('button', { name: 'Salvar' });
  }

  // Ações da página
  async acessarPagina() {
    await this.page.goto('/pessoas');
  }

  async iniciarAdicaoPessoa() {
    await this.btnAdicionarPessoa.click();
  }

  async preencherNome(nome) {
    await this.inputNome.fill(nome);
  }

  async preencherDataNascimento(data) {
    await this.inputDataNascimento.fill(data);
  }

  async clicarSubmit() {
    await this.btnSubmit.click();
  }

  async salvar() {
    await this.btnSalvar.click();
  }
}