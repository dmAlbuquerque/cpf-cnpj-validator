import 'jest';
import _joi from 'joi';
import documentValidator, { cpf, cnpj } from "../src";

const Joi = _joi.extend(documentValidator);

describe('Teste CPF', ()=>{
  const cpfSchema = Joi.document().cpf().required();

  it('deve ser capaz de validar o CPF apenas como número', async()=>{
    const validCPF = cpf.generate();
    const value = await cpfSchema.validateAsync(validCPF);
    expect(value).toBe(validCPF);
  })

  test("deve ser capaz de validar o CPF formatado", async () => {
    const validCPF = cpf.generate();
    const formatCPF = cpf.format(validCPF);
    const value = await cpfSchema.validateAsync(formatCPF);

    expect(value).toEqual(formatCPF);
  });

  test("deve falhar no CPF inválido", async () => {
    const cpf = "01283191283";
    try {
      await cpfSchema.validateAsync(cpf);
    } catch (error) {
      const joiError = error as _joi.ValidationError;
      
      expect(joiError.details).toEqual([
        {
          message: "CPF inválido",
          path: [],
          type: "document.cpf",
          context: { label: "value", value: "01283191283" },
        },
      ]);
    }
  });

  test("deve falhar no CPF inválido e formatado", async () => {
    const cpf = "012.831.912-83";
    try {
      await cpfSchema.validateAsync(cpf);
    } catch (error) {
      const joiError = error as _joi.ValidationError;

      expect(joiError.details).toEqual([
        {
          message: "CPF inválido",
          path: [],
          type: "document.cpf",
          context: { label: "value", value: "012.831.912-83" },
        },
      ]);
    }
  });
})

describe("Test CNPJ", () => {
  const cnpjSchema = Joi.document().cnpj().required();

  test("deve ser capaz de validar o CNPJ apenas como número (clássico)", async () => {
    const validCNPJ = cnpj.generate({type: 'numeric'});
    const value = await cnpjSchema.validateAsync(validCNPJ);

    expect(value).toEqual(validCNPJ);
  });

  test("deve ser capaz de validar o CNPJ como uma string com pontos e barras (clássico)", async () => {
    const validCNPJ = cnpj.generate({ type: "numeric", formatted: true });
    const formatCNPJ = cnpj.format(validCNPJ);

    const value = await cnpjSchema.validateAsync(formatCNPJ);
    expect(value).toEqual(formatCNPJ);
  });

  test("deve falhar no CNPJ inválido (clássico)", async () => {
    const cnpj = "01283191283126";
    try {
      await cnpjSchema.validateAsync(cnpj);
    } catch (error) {
      const joiError = error as _joi.ValidationError;
      expect(joiError.details).toEqual([
        {
          message: "CNPJ inválido",
          path: [],
          type: "document.cnpj",
          context: { label: "value", value: "01283191283126" },
        },
      ]);
    }
  });

  test("deve falhar no CNPJ inválido formatado (clássico)", async () => {
    const cnpj = "01.283.191/2831-26";
    try {
      await cnpjSchema.validateAsync(cnpj);
    } catch (error) {
      const joiError = error as _joi.ValidationError;
      expect(joiError.details).toEqual([
        {
          message: "CNPJ inválido",
          path: [],
          type: "document.cnpj",
          context: { label: "value", value: "01.283.191/2831-26" },
        },
      ]);
    }
  });

  test("deve ser capaz de validar o CNPJ alfanumérico sem formatação", async () => {
    const validCNPJ = cnpj.generate({type: 'alfanumeric'});
    const value = await cnpjSchema.validateAsync(validCNPJ);

    expect(value).toEqual(validCNPJ);
  });

  test("deve ser capaz de validar o CNPJ alfanumérico com formatação", async () => {
    const validCNPJ = cnpj.generate({type: 'alfanumeric', formatted: true});
    const value = await cnpjSchema.validateAsync(validCNPJ);
    expect(value).toEqual(validCNPJ);
  });

  test("deve falhar no CNPJ inválido (alfanumérico)", async () => {
    const cnpj = "01283191283126";
    try {
      await cnpjSchema.validateAsync(cnpj);
    } catch (error) {
      const joiError = error as _joi.ValidationError;
      expect(joiError.details).toEqual([
        {
          message: "CNPJ inválido",
          path: [],
          type: "document.cnpj",
          context: { label: "value", value: "01283191283126" },
        },
      ]);
    }
  });

  test("deve falhar no CNPJ inválido (alfanumérico)", async () => {
    const cnpj = "01.283.191/2831-26";
    try {
      await cnpjSchema.validateAsync(cnpj);
    } catch (error) {
      const joiError = error as _joi.ValidationError;
      expect(joiError.details).toEqual([
        {
          message: "CNPJ inválido",
          path: [],
          type: "document.cnpj",
          context: { label: "value", value: "01.283.191/2831-26" },
        },
      ]);
    }
  });
  
});