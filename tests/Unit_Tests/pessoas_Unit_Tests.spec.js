// pessoas_Unit_Tests.spec.js
import { test, expect } from '@playwright/test';
import { gerarUsuario, gerarUsuarioMax } from '../../utils/util';

test.describe('Testes Unitários - Utilitários de Dados', () => {

  test('gerarUsuario deve retornar um objeto com nome e data dinâmicos', () => {
    // Executar a função isoladamente
    const usuario = gerarUsuario();

    // Validar a estrutura do nome
    expect(usuario).toHaveProperty('nome');
    expect(typeof usuario.nome).toBe('string');
    expect(usuario.nome.length).toBeGreaterThan(0); 

    // Validar a nova estrutura da data de nascimento
    expect(usuario).toHaveProperty('dataNascimento');
    expect(typeof usuario.dataNascimento).toBe('string');
    
    // Converte a string gerada de volta para Data para garantir que é uma data real e válida
    const isDataValida = !isNaN(Date.parse(usuario.dataNascimento));
    expect(isDataValida).toBeTruthy();
  });

  test('gerarUsuarioMax deve retornar um objeto com nome de exatamente 201 caracteres', () => {
    const usuarioMax = gerarUsuarioMax();

    expect(usuarioMax).toHaveProperty('nome');
    expect(usuarioMax.nome.length).toBe(201); 
    expect(usuarioMax.nome).toMatch(/^X+$/); 
    
    // Podemos adicionar a mesma validação de data aqui também, se desejar
    expect(usuarioMax).toHaveProperty('dataNascimento');
    expect(typeof usuarioMax.dataNascimento).toBe('string');
  });

});