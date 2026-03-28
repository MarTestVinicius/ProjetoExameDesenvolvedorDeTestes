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

# 🚀 Sugestão de Melhoria: Adição de body específico na API para atualização e remoção

## Contexto Atual
Atualmente, as requisições de atualização e remoção de usuários não possuem um corpo de resposta com uma mensagem ou dados específicos. Elas dependem exclusivamente do Status Code, o que limita a assertividade das validações automatizadas e manuais.

## A Melhoria Proposta
Adicionar um JSON de resposta com dados detalhados para as ações de atualização e remoção de usuários, fornecendo mais contexto para quem consome a API.

## Benefícios Esperados
Além de validar o Status code, a presença de um body permitiria:
* **Na Atualização:** Validar um comparativo estruturado (exemplo: um `De -> Para` mostrando os dados antigos e os novos alterados), se assim for possível.
* **Na Remoção:** Retornar não apenas uma mensagem de "Remoção com sucesso", mas também o `ID` e o `Nome` do usuário deletado. Isso garantirá uma validação muito mais robusta em testes E2E, permitindo que scripts automatizados confirmem exatamente qual registro foi afetado, se assim for possível.