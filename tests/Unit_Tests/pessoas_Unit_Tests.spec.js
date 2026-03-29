import { test, expect } from '@playwright/test';
import { gerarUsuario, gerarUsuarioMax } from '../../utils/util';

test.describe('Testes Unitários - Utilitários de Dados', () => {

  test('gerarUsuario deve retornar um objeto com nome dinâmico e data fixa', () => {
    // Executar a função isoladamente
    const usuario = gerarUsuario();

    //Validar a estrutura do objeto gerado em memória
    expect(usuario).toHaveProperty('nome');
    expect(typeof usuario.nome).toBe('string');
    expect(usuario.nome.length).toBeGreaterThan(0); // Garante que o nome não vem vazio

    expect(usuario).toHaveProperty('dataNascimento');
    expect(usuario.dataNascimento).toBe('1998-05-12T01:18:29.02');
  });

  test('gerarUsuarioMax deve retornar um objeto com nome de exatamente 201 caracteres', () => {
    // Executar a função isoladamente
    const usuarioMax = gerarUsuarioMax();

    // Validar a estrutura do objeto gerado em memória
    expect(usuarioMax).toHaveProperty('nome');
    expect(usuarioMax.nome.length).toBe(201); // Valida a lógica matemática do .repeat(201)
    
    // Validar se a string é composta apenas por 'X'
    expect(usuarioMax.nome).toMatch(/^X+$/); 
  });

});