![License](https://img.shields.io/npm/l/cpf-cnpj-validator)
![Version](https://img.shields.io/npm/v/cpf-cnpj-validator)


# Documentação da Biblioteca de CPF e CNPJ

O objetivo do projeto é facilitar a validação e geração de CPF, CNPJ e CNPJ alfanumérico. Também é possível validar CPF e CNPJ utilizando a biblioteca Joi.

## Instalação
```sh
npm install @dmalbuquerque/cpf-cnpj-validator
```

## Como importar a biblioteca

### Para projetos com Typescript
```ts
import { cpf, cnpj, documentValidator} from '@dmalbuquerque/cpf-cnpj-validator';

console.log(cpf.isValid('21156032300'));
console.log(cnpj.isValid('20245526000149'));
```
---

### Para projetos com Javascript
```js
const { cpf, cnpj, documentValidator} = require('@dmalbuquerque/cpf-cnpj-validator');

console.log(cpf.isValid('21156032300'));
console.log(cnpj.isValid('20245526000149'));
```
ou

```js
const documents = require('@dmalbuquerque/cpf-cnpj-validator');

console.log(documents.cpf.isValid('21156032300'));
console.log(documents.cnpj.isValid('20245526000149'));
```


## Como usar

### CPF

#### Gerar um CPF

- **CPF numérico sem formatação**:
  ```js
  cpf.generate(); // Exemplo de retorno: "07208766053"
  ```
- **CPF formatado**:
  ```js
  cpf.generate({ formatted: true }); // Exemplo de retorno: "072.087.660-53"
  ```

#### Validar um CPF

- **CPF válido**:
  ```js
  cpf.isValid("07208766053"); // Retorna: true
  cpf.isValid("072.087.660-53"); // Retorna: true
  ```
- **CPF inválido**:
  ```js
  cpf.isValid("07208766050"); // Retorna: false
  cpf.isValid("072.087.660-50"); // Retorna: false
  ```

#### Formatar um CPF

- **Converter um CPF numérico para o formato padrão**:
  ```js
  cpf.format("07208766053"); // Retorna: "072.087.660-53"
  ```

---

### CNPJ

#### Gerar um CNPJ

- **CNPJ clássico sem formatação**:
  ```js
  cnpj.generate({ type: "numeric" }); // Exemplo de retorno: "25143815000150"
  ```
  ou 

  ```js
  cnpj.generate();
  ```
- **CNPJ clássico formatado**:
  ```js
  cnpj.generate({ type: "numeric", formatted: true }); // Exemplo de retorno: "25.143.815/0001-50"
  ```
- **CNPJ alfanumérico sem formatação**:
  ```js
  cnpj.generate({ type: "alfanumeric" }); // Exemplo de retorno: "OGZP0N77444Y42"
  ```
- **CNPJ alfanumérico formatado**:
  ```js
  cnpj.generate({ type: "alfanumeric", formatted: true }); // Exemplo de retorno: "OG.ZP0.N77/444Y-42"
  ```

#### Validar um CNPJ

- **CNPJ clássico válido**:
  ```js
  cnpj.isValid("25143815000150"); // Retorna: true
  cnpj.isValid("25.143.815/0001-50"); // Retorna: true
  ```
- **CNPJ clássico inválido**:
  ```js
  cnpj.isValid("25143815000140"); // Retorna: false
  cnpj.isValid("25.143.815/0001-40"); // Retorna: false
  ```
- **CNPJ alfanumérico válido**:
  ```js
  cnpj.isValid("OGZP0N77444Y42"); // Retorna: true
  cnpj.isValid("OG.ZP0.N77/444Y-42"); // Retorna: true
  ```
- **CNPJ alfanumérico inválido**:
  ```js
  cnpj.isValid("OGZP0N77444Y40"); // Retorna: false
  cnpj.isValid("OG.ZP0.N77/444Y-40"); // Retorna: false
  ```

#### Formatar um CNPJ

- **Converter um CNPJ numérico para o formato padrão**:
  ```js
  cnpj.format("25143815000150"); // Retorna: "25.143.815/0001-50"
  ```
- **Converter um CNPJ alfanumérico para o formato padrão**:
  ```js
  cnpj.format("OGZP0N77444Y42"); // Retorna: "OG.ZP0.N77/444Y-42"
  ```

## Validação com Joi

Esta biblioteca também permite a validação de CPF e CNPJ utilizando a biblioteca Joi. Veja um exemplo de implementação:

```js
import Joi from "joi";
import documentValidator from "@dmalbuquerque/cpf-cnpj-validator";

const joi = Joi.extend(documentValidator);

const schema = Joi.object({
  cpf: joi.document().cpf().optional().label("CPF"),
  cnpj: joi.document().cnpj().required().label("CNPJ"),
});

const resultado = schema.validate({ cpf: null, cnpj: "25143815000150" });
console.log(resultado.error ? resultado.error.details : "Dados válidos!");
```
## 🔹 Regras de Validação

| Cenário | CPF | CNPJ | Resultado |
|----------|-----|------|-----------|
| Valor `null` | ✅ Aceito | ✅ Aceito | **✅ Válido** |
| String vazia (`""`) | ❌ `CPF não pode ser vazio` | ❌ `CNPJ não pode ser vazio` | **❌ Erro** |
| Campo obrigatório ausente | ❌ `CPF é obrigatório` | ❌ `CNPJ é obrigatório` | **❌ Erro** |
---

## Testes Automatizados
Esta biblioteca possui testes automatizados para garantir a qualidade do código. Para rodá-los localmente, basta executar o seguinte comando:
```sh 
npm run test
```
Isso irá rodar todos os testes definidos usando o <b>Jest</b>. Certifique-se de ter o Jest instalado em seu ambiente de desenvolvimento.

## Como Contribuir
Se você deseja contribuir para este projeto, siga as etapas abaixo:
1. Faça um fork deste repositório.
2. Clone o repositório forkado para o seu ambiente local.
3. Instale as dependências do projeto: `npm install`.
4. Faça suas alterações e testes.
5. Execute os testes localmente para garantir que tudo esteja funcionando corretamente: ```npm run test```
5. Crie uma nova branch para suas alterações: `git checkout -b minha-feature`.
6. Abra o PR com suas alterações.


## ✔️ Licença
Destribuido sob a licença MIT. © Daniel Albuquerque

