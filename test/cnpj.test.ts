import { cnpj } from "../src/index";

describe("CNPJ", () => {
  it("números de listas negras", () => {
    expect(cnpj.isValid("00000000000000")).toBeFalsy();
    expect(cnpj.isValid("11111111111111")).toBeFalsy();
    expect(cnpj.isValid("22222222222222")).toBeFalsy();
    expect(cnpj.isValid("33333333333333")).toBeFalsy();
    expect(cnpj.isValid("44444444444444")).toBeFalsy();
    expect(cnpj.isValid("55555555555555")).toBeFalsy();
    expect(cnpj.isValid("66666666666666")).toBeFalsy();
    expect(cnpj.isValid("77777777777777")).toBeFalsy();
    expect(cnpj.isValid("88888888888888")).toBeFalsy();
    expect(cnpj.isValid("99999999999999")).toBeFalsy();
  });

  it("rejeita valores falsos", () => {
    expect(cnpj.isValid("")).toBeFalsy();
  });

  it("valida strings formatadas (clássico)", () => {
    expect(cnpj.isValid("54.550.752/0001-55")).toBeTruthy();
  });

  it("valida string não formatadas (clássico)", () => {
    expect(cnpj.isValid("54550752000155")).toBeTruthy();
  });

  it("string inválida (clássico)", () => {
    expect(cnpj.isValid("54550752000156")).toBeFalsy();
  });

  it("valida strings formatadas (alfanumérico)", () => {
    expect(cnpj.isValid("12.ABC.345/01DE-35")).toBeTruthy();
  });

  it("valida string não formatadas (alfanumérico)", () => {
    expect(cnpj.isValid("12ABC34501DE35")).toBeTruthy();
  });

  it("string inválida (alfanumérico)", () => {
    expect(cnpj.isValid("12ABC34501DE36")).toBeFalsy();
  });

  it("gera CNPJ válido (clássico)", () => {
    const generate = cnpj.generate();
    expect(cnpj.isValid(generate)).toBeTruthy();
  });

  it("gera CNPJ válido formatado (clássico)", () => {
    const generate = cnpj.generate({formatted: true});
    expect(cnpj.isValid(generate)).toBeTruthy();
  });
});
