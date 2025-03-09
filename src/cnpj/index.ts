import { generateNumeric, validateNumeric } from "./numeric";
import { generateAlphanumeric, validateAlphanumeric } from "./alfanumeric";
import { CNPJ_LENGTH } from "../constants";

interface CNPJOptions {
  type?: "numeric" | "alfanumeric";
  formatted?: boolean;
}

/**
 * Gera um número de CNPJ.
 * 
 * Esta função gera um CNPJ válido. O CNPJ gerado pode ser retornado com diferentes tipos: numérico ou alfanumérico (letras e números).
 * Além disso, pode ser retornado com ou sem formatação.
 * 
 * @param {CNPJOptions} [options] - Opções para a geração do CNPJ.
 * @param {('numeric' | 'alfanumeric')} [options.type] - O tipo de CNPJ a ser gerado. 
 * Pode ser:
 * - `'numeric'`: Gera um CNPJ clássico, composto apenas por números.
 * - `'alfanumeric'`: Gera um CNPJ com caracteres alfanuméricos.
 * Se não for especificado, o padrão será `'numeric'`.
 * @param {boolean} [options.formatted] - Se verdadeiro, retorna o CNPJ formatado. Caso contrário, retorna o CNPJ sem formatação.
 * 
 * @returns {string} O CNPJ gerado, podendo ser formatado ou não, conforme as opções fornecidas.
 * 
 * @example
 * // Retorna um CNPJ clássico numérico sem formatação, como '25143815000150'
 * generate({ type: 'numeric' });
 * 
 * @example
 * // Retorna um CNPJ clássico numérico formatado, como '25.143.815/0001-50'
 * generate({ type: 'numeric', formatted: true });
 * 
 * @example
 * // Retorna um CNPJ alfanumérico sem formatação, como 'OGZP0N77444Y42'
 * generate({ type: 'alfanumeric' });
 * 
 * @example
 * // Retorna um CNPJ alfanumérico formatado, como 'OG.ZP0.N77/444Y-42'
 * generate({ type: 'alfanumeric', formatted: true });
 */
function generate(options?: CNPJOptions): string {
  let cnpj = "";

  if (options?.type === "alfanumeric") {
    cnpj = generateAlphanumeric();
  } else {
    cnpj = generateNumeric();
  }

  return options?.formatted ? format(cnpj) : cnpj;
}

/**
 * Valida um CNPJ (numérico ou alfanumérico) verificando seu formato e seus dígitos verificadores.
 * 
 * A função remove qualquer caractere não alfanumérico do CNPJ e, em seguida, verifica se o CNPJ tem o 
 * comprimento correto. Dependendo do tipo de CNPJ (numérico ou alfanumérico), a função valida o CNPJ 
 * chamando a função apropriada para cada tipo.
 * 
 * @param cnpj - O CNPJ a ser validado, que pode estar no formato com ou sem pontuação.
 * 
 * @returns {boolean} Retorna `true` se o CNPJ for válido (numérico ou alfanumérico) e `false` caso contrário.
 * 
 * @example
 * // Retorna true se o CNPJ for válido
 * isValid("25.143.815/0001-50");
 * 
 * // Retorna false se o CNPJ for inválido
 * isValid("OGZP0N77444Y40");
 */
function isValid(cnpj: string): boolean {
  const cleanedCNPJ = cnpj.replace(/[^a-zA-Z0-9]/g, "");
  if (cleanedCNPJ.length === CNPJ_LENGTH) {
    if (isNumeric(cleanedCNPJ)) {
      return validateNumeric(cleanedCNPJ);
    } else if (isAlfanumeric(cleanedCNPJ)) {
      return validateAlphanumeric(cleanedCNPJ);
    }
  }
  return false;
}

/**
 * Formata um número de CNPJ para o formato padrão com pontuação.
 * 
 * A função recebe um CNPJ como string sem formatação e o converte para o formato padrão: 
 * XX.XXX.XXX/XXXX-XX.
 * 
 * @param cnpj - O CNPJ a ser formatado, fornecido como uma string sem pontuação.
 * 
 * @returns {string} O CNPJ formatado.
 * 
 * @example
 * // Retorna "25.143.815/0001-50"
 * format("25143815000150");
 */
function format(cnpj: string): string {
  return cnpj.replace(/(.{2})(.{3})(.{3})(.{4})(.{2})/, "$1.$2.$3/$4-$5");
}

/**
 * Verifica se uma string consiste apenas em caracteres numéricos (0-9).
 * 
 * @param value - A string a ser verificada.
 * 
 * @returns {boolean} Retorna `true` se a string for composta apenas por números, `false` caso contrário.
 * 
 * @example
 * isNumeric("123456"); // true
 * isNumeric("12A345"); // false
 */
function isNumeric(value: string): boolean {
  return /^[0-9]+$/.test(value);
}

/**
 * Verifica se uma string consiste apenas em caracteres alfanuméricos (A-Z, a-z, 0-9).
 * 
 * @param value - A string a ser verificada.
 * 
 * @returns {boolean} Retorna `true` se a string for composta apenas por caracteres alfanuméricos, 
 *         `false` caso contrário.
 * 
 * @example
 * isAlfanumeric("abc123"); // true
 * isAlfanumeric("abc!123"); // false
 */
function isAlfanumeric(value: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(value);
}

export default {
  generate,
  isValid,
  format,
};
