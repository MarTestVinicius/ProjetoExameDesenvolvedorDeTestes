# Automação de Testes

Este documento contém o projeto de automação de testes, cobrindo testes de Interface (UI), Integração (API) e testes Unitários.

---

## 📌 Tecnologias Utilizadas

- Node.js
- Playwright
- Faker.js

---

## 🚀 Como Executar os Testes

### Pré-requisitos

- Node.js instalado
- Playwright instalado

### Instalação

```bash
npm install
npx playwright install
```

### Execução dos testes

```bash
# Testes de API
npx playwright test tests/API/pessoas_API.spec.js

# Testes de UI
npx playwright test tests/UI/pessoas_UI.spec.js

# Testes Unitários
npx playwright test tests/Unit_Tests/pessoas_Unit_Tests.spec.js

# Todos os testes
npx playwright test
```

---

## 🧪 Estratégia de Testes

### 🔹 Testes Unitários
Validação de funções utilitárias e geração de dados (`util.js`), fazendo a validação dos componentes de maneira isolados.

### 🔹 Testes de API (Integração)
Validação de:
- HTTP (GET, POST, PUT, DELETE)
- Status codes
- Estrutura de dados
- Regras de negócio

Uso de `beforeEach` e `afterEach` para garantir independência entre cenários.

### 🔹 Testes de UI (E2E)
Validação de fluxos reais do usuário:
- Interações no navegador
- Comportamentos visuais
- Regras de negócio aplicadas no frontend

---

## 🧠 Decisões Técnicas

- Uso do Faker.js para geração de dados dinâmicos
- Separação dos testes por tipo (API, UI e Unit)
- Independência dos testes de API para execução paralela

---

## 🐞 Bugs Encontrados

### Bug 1: Validação de data obrigatória

**Descrição:**  
Na tentativa do usuário de criar um novo registro, a mensagem informativa **"Data de nascimento é obrigatória."** não é apresentada em tela de acordo com a regra estabelecida no documento `PessoaDto.cs` quando o campo "Data de Nascimento" é enviado vazio.

**Passos:**
1. Abrir a aplicação.
2. Ir para a aba/sessão **"Pessoas"**.
3. Clicar no botão **"Adicionar Pessoas"**.
4. Remover ou limpar as informações do campo **"Data de Nascimento"**.
5. Clicar no botão **"Salvar"**.

**Esperado:**  
A mensagem informativa **"Data de nascimento é obrigatória."** deve ser apresentada na tela, seguindo estritamente o padrão solicitado na documentação do `PessoaDto.cs`.

**Atual:**  
A mensagem apresentada no lugar da esperada foi: `"Invalid input: expected date, received Date"`

---

### Bug 2: Validação de data futura

**Descrição:**  
Na tentativa do usuário de criar um novo registro, a mensagem informativa "Data de nascimento não pode ser no futuro." não é apresentada em tela de acordo com a regra estabelecida no documento `PessoaValidation.cs` quando o campo "Data de Nascimento" recebe uma data superior à data atual.

**Passos:**
1. Abrir a aplicação.
2. Ir para a sessão "Pessoas".
3. Clicar no botão "Adicionar Pessoas".
4. Adicionar uma data à frente da data atual no campo "Data de Nascimento".
5. Clicar no botão "Salvar".

**Esperado:**  
* A mensagem informativa **"Data de nascimento não pode ser no futuro."** deve ser apresentada corretamente em tela, conforme a documentação `PessoaValidation.cs`.
* A mensagem deve ser exibida logo **abaixo do campo de data**, facilitando o entendimento do usuário sobre qual campo precisa ser ajustado.

**Atual:**  
* A mensagem apresentada foi um erro genérico: **"Erro ao salvar pessoa. Tente novamente."**.
* A mensagem foi exibida em um *Toast Message*, fugindo do padrão esperado de exibir o erro diretamente abaixo do campo afetado.

---

## 🔧 Sugestões de Melhoria

### 📌 API
- Adicionar body de resposta em update/delete
- Retornar dados relevantes (ID, nome, alterações)

### 🔎 Busca
- Implementar pesquisa por nome (já suportado pela API)
Adicionar um campo de pesquisa na tela principal (semelhante ao fluxo já existente de adicionar/editar pessoa). Esse campo permitiria buscar usuários pelo nome ou parte dele. Vale ressaltar que essa capacidade já é suportada pela API atual (através do parâmetro search), bastando apenas a integração e exibição dos resultados no frontend.

### 📝 Campo Nome
- Restringir para caracteres alfanuméricos
Reduzir a possibilidade de criar usuários com nomes errados e também reduzir, possívelmente a operação de edição de nome do usuário deixando a aplicação com mais recursos para outras operações.

---

## 📄 Considerações Finais

O projeto foi estruturado priorizando clareza, organização e boas práticas de automação de testes, garantindo uma abordagem sólida na validação das funcionalidades em diferentes níveis.
