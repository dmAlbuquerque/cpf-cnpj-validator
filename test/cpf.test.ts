import {cpf} from "../src/index";

describe('CPF', () => {
  it('números de listas negras', () => {
    expect(cpf.isValid("00000000000")).toBeFalsy();
    expect(cpf.isValid("11111111111")).toBeFalsy();
    expect(cpf.isValid("22222222222")).toBeFalsy();
    expect(cpf.isValid("33333333333")).toBeFalsy();
    expect(cpf.isValid("44444444444")).toBeFalsy();
    expect(cpf.isValid("55555555555")).toBeFalsy();
    expect(cpf.isValid("66666666666")).toBeFalsy();
    expect(cpf.isValid("77777777777")).toBeFalsy();
    expect(cpf.isValid("88888888888")).toBeFalsy();
    expect(cpf.isValid("99999999999")).toBeFalsy();
    expect(cpf.isValid("12345678909")).toBeFalsy();
  });

  it('rejeita valores falsos', ()=>{
    expect(cpf.isValid("")).toBeFalsy();
  })

  it('valida strings formatadas', ()=>{
    expect(cpf.isValid("295.379.955-93")).toBeTruthy();
  })

  it('valida string não formatadas', ()=>{
    expect(cpf.isValid("29537995593")).toBeTruthy();
  })

  it("valida CPF inválido", () => {
    expect(cpf.isValid("29537995594")).toBeFalsy();
  });


  it('retorna o número formatado', ()=>{
    const number = cpf.generate();
    const numberFormatted = cpf.format(number);
    expect(numberFormatted).toBe(cpf.format(number));
  })

  it("retorna o número sem formatação", () => {
    const number = cpf.generate();
    expect(number).toBe(number);
  });
});
