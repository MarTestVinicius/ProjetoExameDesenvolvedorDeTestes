import Usuarios_Api from '.././services/usuarios.api';
import { expect } from '@playwright/test';

export class PessoasPage {
  constructor(page, request) {
    this.page = page;
    this.request = request;

    this.usuario_Api = new Usuarios_Api(request);

    // Mapeamento dos seletores
    this.btnAdicionarPessoa = page.getByRole('button', { name: 'Adicionar Pessoa' });
    this.inputNome = page.locator('input#nome');
    this.inputDataNascimento = page.getByLabel('Data de Nascimento');
    this.btnSubmit = page.locator('button[type="submit"]');
    this.btnSalvar = page.getByRole('button', { name: 'Salvar' });
    this.tabela_row = page.getByRole('row')
    this.btnProximo = page.getByRole('button', { name: 'Próximo' });
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
    await this.page.waitForLoadState('networkidle');
  }

  async validarUsuarioNovoSalvoAPI(nome) {
    const response = await this.usuario_Api.listarUsuarios(1, 20, 1, nome);
    const body = await response.json();

    expect(body.items).toHaveLength(1);
    expect(body.items[0].nome).toBe(nome);
  }

  async validarTelausuarioNovo(nome) {
    const pesquisaNome = this.tabela_row.filter({ hasText: nome });
    const maxPaginas = 10;
    let paginasVerificadas = 0;

    while (await pesquisaNome.count() === 0) {

      // Trava de segurança
      if (paginasVerificadas >= maxPaginas) {
        throw new Error(`Usuário "Marcus" não foi encontrado após buscar em ${maxPaginas} páginas.`);
      }

      // Verifica se o botão de "Próximo" está habilitado antes de clicar
      // Se o botão ficar desabilitado na última página e não acharmos o Marcus, o teste para.
      await expect(this.btnProximo).toBeEnabled({
        message: 'Chegamos na última página e o usuário Marcus não foi encontrado.'
      });

      // Clica para ir para a próxima página
      await this.btnProximo.click();

      // DICA: Adicione um pequeno tempo de espera explícito ou espere a requisição da nova página terminar 
      // para que o DOM atualize antes do "while" rodar novamente no topo.
      await this.page.waitForTimeout(500); // Espera simples (substitua por waitForResponse se preferir)

      paginasVerificadas++;
    }
  }

  async removerUsuarioApi(nome) {
    await expect(async () => {
      const response = await this.usuario_Api.listarUsuarios(1, 20, 1, process.env.NAME_REMOVE);
      expect(response.ok()).toBeTruthy();
      const body = await response.json();

      if (body.items && body.items.length > 0) {
        const id = body.items[0].id;
        const responseDelete = await this.usuario_Api.deletarUserPorId(id, 1);
        expect(responseDelete.ok()).toBeTruthy();
      }

    }).toPass({
      intervals: [1000, 2000, 5000, 8000], // Tenta de novo em 1s, depois 2s, depois 5s
      timeout: 20000 // Tempo máximo tentando até desistir de vez
    });
  };
}