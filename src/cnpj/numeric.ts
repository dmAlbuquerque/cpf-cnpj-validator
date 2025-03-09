import { CNPJ_LENGTH } from "../constants";


/**
 * Gera um CNPJ numérico válido (clássico).
 * 
 * Esta função gera um CNPJ numérico válido, composto apenas por números. 
 * O número gerado é composto por uma base numérica gerada e os dois dígitos verificadores calculados.
 * 
 * @returns {string} O CNPJ numérico gerado, como uma string de 14 dígitos, sem formatação (apenas números).
 * 
 * @example
 * // Retorna um CNPJ numérico válido, como '25143815000150'
 * generateNumeric();
 */
function generateNumeric(): string {
  const baseCNPJ = generateBaseNumeric();
  const [firstDigit, secondDigit] = calculateCheckDigits(baseCNPJ);
  return [...baseCNPJ, firstDigit, secondDigit].join("");
}

/**
 * Gera a base numérica de um CNPJ.
 * 
 * Esta função gera uma base numérica aleatória composta por 12 dígitos (números de 0 a 9),
 * que são utilizados como a primeira parte do CNPJ, antes dos dois dígitos verificadores.
 * 
 * @returns {number[]} Um array de 12 números (de 0 a 9), representando a base numérica do CNPJ.
 * 
 * @example
 * // Retorna algo como [2, 4, 6, 1, 5, 3, 9, 7, 8, 0, 1, 4]
 * generateBaseNumeric();
 */
function generateBaseNumeric(): number[] {
  return Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));
}

/**
 * Calcula os dois dígitos verificadores de um CNPJ.
 * 
 * A função utiliza a base do CNPJ e calcula os dois dígitos verificadores necessários
 * para completar o número do CNPJ. O primeiro dígito é calculado com a base original,
 * e o segundo dígito é calculado após a adição do primeiro dígito.
 * 
 * @param baseCNPJ - A base do CNPJ, composta por números ou letras, sem os dígitos verificadores.
 * 
 * @returns {number[]} Um array com os dois dígitos verificadores do CNPJ.
 * 
 * @example
 * // Retorna algo como [5, 8]
 * calculateCheckDigits([2, 'F', 5, 'G', 8, 'B', 0, 'A', 1, 'C', 3, 'D']);
 */
function calculateCheckDigits(baseCNPJ: number[]): number[] {
  const firstDigit = calculateCheckDigit(baseCNPJ);
  const secondDigit = calculateCheckDigit([...baseCNPJ, firstDigit]);
  return [firstDigit, secondDigit];
}

/**
 * Calcula o dígito verificador de um CNPJ ou CPF a partir dos números ou letras fornecidos.
 * 
 * A função utiliza a soma ponderada dos números, considerando o peso de cada posição,
 * e aplica a fórmula do módulo 11 para calcular o dígito verificador.
 * Caso o resto da divisão seja menor que 2, o dígito verificador será 0, caso contrário,
 * o dígito será 11 menos o resto.
 * 
 * @param digits - Um array de números ou letras que representam a base do CNPJ ou CPF.
 * 
 * @returns {number} O dígito verificador calculado.
 * 
 * @example
 * // Retorna 5
 * calculateCheckDigit([2, 5, 1, 4, 3, 8, 1, 5, 0, 0, 1, 5]);
 */
function calculateCheckDigit(digits: number[]): number {
  let sum = 0;
  let weight = 2;

  for (let i = digits.length - 1; i >= 0; i--) {
    sum += digits[i] * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }

  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

/**
 * Valida um CNPJ clássico (numérico) verificando seu formato e seus dígitos verificadores.
 * 
 * A função limpa a string do CNPJ, valida o formato e calcula os dígitos verificadores
 * para garantir que o CNPJ fornecido seja válido. 
 * 
 * @param cnpj - O CNPJ a ser validado, que pode estar no formato com ou sem pontuação.
 * 
 * @returns {boolean} Retorna `true` se o CNPJ for válido e `false` caso contrário.
 * 
 * @example
 * // Retorna true se o CNPJ for válido
 * validateNumeric("25143815000150");
 * 
 * // Retorna false se o CNPJ for inválido
 * validateNumeric("25143815000140");
 */
function validateNumeric(cnpj: string): boolean {
  const cleanedCNPJ = cleanCNPJ(cnpj, true);
  if (!isValidFormat(cleanedCNPJ)) return false;

  const digits = cleanedCNPJ.split("").map(Number);
  const baseCNPJ = digits.slice(0, 12);

  const [firstDigit, secondDigit] = calculateCheckDigits(baseCNPJ);
  return firstDigit === digits[12] && secondDigit === digits[13];
}

/**
 * Valida um CNPJ clássico (numérico) verificando seu formato e seus dígitos verificadores.
 * 
 * A função limpa a string do CNPJ, valida o formato e calcula os dígitos verificadores
 * para garantir que o CNPJ fornecido seja válido. 
 * 
 * @param cnpj - O CNPJ a ser validado, que pode estar no formato com ou sem pontuação.
 * 
 * @returns {boolean} Retorna `true` se o CNPJ for válido e `false` caso contrário.
 * 
 * @example
 * // Retorna true se o CNPJ for válido
 * validateNumeric("25143815000150");
 * 
 * // Retorna false se o CNPJ for inválido
 * validateNumeric("25143815000140");
 */
function cleanCNPJ(cnpj: string, numeric: boolean): string {
  return numeric ? cnpj.replace(/\D/g, "") : cnpj.replace(/[./-]/g, "");
}

/**
 * Valida um CNPJ clássico (numérico) verificando seu formato e seus dígitos verificadores.
 * 
 * A função limpa a string do CNPJ, valida o formato e calcula os dígitos verificadores
 * para garantir que o CNPJ fornecido seja válido. 
 * 
 * @param cnpj - O CNPJ a ser validado, que pode estar no formato com ou sem pontuação.
 * 
 * @returns {boolean} Retorna `true` se o CNPJ for válido e `false` caso contrário.
 * 
 * @example
 * // Retorna true se o CNPJ for válido
 * validateNumeric("25143815000150");
 * 
 * // Retorna false se o CNPJ for inválido
 * validateNumeric("25143815000140");
 */
function isValidFormat(cnpj: string): boolean {
  return cnpj.length === CNPJ_LENGTH && !/^(\d)\1+$/.test(cnpj);
}

export { generateNumeric, validateNumeric, cleanCNPJ, isValidFormat };
