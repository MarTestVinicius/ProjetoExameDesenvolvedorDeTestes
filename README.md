# Automação de Testes - Processo Seletivo (QA Engineer)

Este repositório contém o projeto de automação de testes para a avaliação técnica, cobrindo testes de Interface (UI), Integração (API) e testes Unitários.

-----------------------------------------------------------------------------------------------------------------------------------------

## Como rodar cada tipo de teste

### Pré-requisitos
* **Visual Studio Code** instalado.
* **PlayWright** instalado
npx playwright install

### Para executar testes apenas de API
npx playwright test  tests/API/pessoas_API.spec.js

### Para executar testes apenas de UI
npx playwright test  tests/UI/pessoas_UI.spec.js

### Para executar testes apenas de Unit Testes
npx playwright test  tests/Unit_Tests/pessoas_Unit_Tests.spec.js

### Para executar todos os testes
npx playwright test
-----------------------------------------------------------------------------------------------------------------------------------------

## Como a pirâmide foi estruturada

### Camada de Testes Unitários (Base)
Focada em testar isoladamente as funções utilitárias e geradoras de massa de dados do próprio projeto de automação (util.js).

### Camada de Integração / API
Concentra a maior parte das validações lógicas e contratuais. O ficheiro pessoas_API.spec.js, valida os verbos HTTP (GET, POST, PUT, DELETE), status codes, tipos de dados e cálculos de regras de negócio feitas pelo backend.

### Camada de UI / E2E
Focada estritamente no que impacta o utilizador final. O ficheiro pessoas.spec.js testa fluxos reais pelo navegador, garantindo que as validações e bloqueios do frontend funcionem, assim como a interatividade visual.
-----------------------------------------------------------------------------------------------------------------------------------------

## Justificativa das escolhas de testes

### Cenários de API sendo independentes
com o usudo das estratégias beforeEach e afterEach cada teste de API se torna independente um do outro, permitindo que os cenários ocorram mais rápido em paralelo.

### Uso de dados dinâmicos
com a utilizando o fakerjs evito conflitos de dados.

### Separação de arquivos .spec.js
essa estrutura serve para separação de testes específicos de API, UI e Unit Teste.

-----------------------------------------------------------------------------------------------------------------------------------------

# Bug: Exibição da mensagem informativa "Data de nascimento é obrigatória." não é apresentada corretamente

## Descrição
Na tentativa do usuário de criar um novo registro, a mensagem informativa "Data de nascimento é obrigatória." não é apresentada em tela de acordo com a regra estabelecida no documento `PessoaDto.cs` quando o campo "Data de Nascimento" é enviado vazio.

## Passos de Reprodução
1. Abrir a aplicação.
2. Ir para a sessão "Pessoas".
3. Clicar no botão "Adicionar Pessoas".
4. Remover/limpar as informações do campo "Data de Nascimento".
5. Clicar no botão "Salvar".

## Resultado Esperado
A mensagem informativa **"Data de nascimento é obrigatória."** deve ser apresentada na tela, seguindo estritamente o padrão solicitado na documentação do `PessoaDto.cs`.

## Resultado Obtido
A mensagem apresentada foi **"Invalid input: expected date, received Date"**.

---

# Bug: Exibição da mensagem informativa "Data de nascimento não pode ser no futuro." não é apresentada corretamente

## Descrição
Na tentativa do usuário de criar um novo registro, a mensagem informativa "Data de nascimento não pode ser no futuro." não é apresentada em tela de acordo com a regra estabelecida no documento `PessoaValidation.cs` quando o campo "Data de Nascimento" recebe uma data superior à data atual.

## Passos de Reprodução
1. Abrir a aplicação.
2. Ir para a sessão "Pessoas".
3. Clicar no botão "Adicionar Pessoas".
4. Adicionar uma data à frente da data atual no campo "Data de Nascimento".
5. Clicar no botão "Salvar".

## Resultado Esperado
* A mensagem informativa **"Data de nascimento não pode ser no futuro."** deve ser apresentada corretamente em tela, conforme a documentação `PessoaValidation.cs`.
* A mensagem deve ser exibida logo **abaixo do campo de data**, facilitando o entendimento do usuário sobre qual campo precisa ser ajustado.

## Resultado Obtido
* A mensagem apresentada foi um erro genérico: **"Erro ao salvar pessoa. Tente novamente."**.
* A mensagem foi exibida em um *Toast Message*, fugindo do padrão esperado de exibir o erro diretamente abaixo do campo afetado.

---

# Sugestão de Melhoria: Adição de body específico na API para atualização e remoção

## Contexto Atual
Atualmente, as requisições de atualização e remoção de usuários não possuem um corpo de resposta com uma mensagem ou dados específicos. Elas dependem exclusivamente do Status Code, o que limita a assertividade das validações automatizadas e manuais.

## A Melhoria Proposta
Adicionar um JSON de resposta com dados detalhados para as ações de atualização e remoção de usuários, fornecendo mais contexto para quem consome a API.

## Benefícios Esperados
Além de validar o Status code, a presença de um body permitiria:
* **Na Atualização:** Validar um comparativo estruturado (exemplo: um `De -> Para` mostrando os dados antigos e os novos alterados), se assim for possível.
* **Na Remoção:** Retornar não apenas uma mensagem de "Remoção com sucesso", mas também o `ID` e o `Nome` do usuário deletado. Isso garantirá uma validação muito mais robusta em testes E2E, permitindo que scripts automatizados confirmem exatamente qual registro foi afetado, se assim for possível.

# Sugestão de Melhoria: Adição da funcionalidade de pesquisa na aplicação

## Contexto Atual
A interface da aplicação não possui um mecanismo de busca de usuários. Isso dificulta a localização de um registro específico, especialmente quando é necessário alterar algum dado ou realizar uma exclusão em uma lista extensa.

## A Melhoria Proposta
Adicionar um campo de pesquisa na tela principal (semelhante ao fluxo já existente de adicionar/editar pessoa). Esse campo permitiria buscar usuários pelo nome ou parte dele. Vale ressaltar que essa capacidade já é suportada pela API atual (através do parâmetro search), bastando apenas a integração e exibição dos resultados no frontend.

## Benefícios Esperados
Facilitar a navegação do usuário e agilizar as operações de manutenção de dados (edição e remoção), melhorando significativamente a usabilidade do sistema.


# Sugestão de Melhoria: Definição mais concreta do tipo de campo Nome

## Contexto Atual
No campo Nome, é possível colocar tanto letras, como números e também caracteres especiais, deixando a cargo do usuário a escrita correta do nome

## A Melhoria Proposta
definir o campo como alfanumérico, delimitando para letras minúsculas e maiúsculas e impedindo o uso de caracteres especiais.

## Benefícios Esperados
Reduzir a possibilidade de criar usuários com nomes errados e também reduzir, possívelmente a operação de edição de nome do usuário deixando a aplicação com mais recursos para outras operações.