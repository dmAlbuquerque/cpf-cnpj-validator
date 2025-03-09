import { ALPHABET, CNPJ_LENGTH } from "../constants";

/**
 * Gera um CNPJ alfanumérico válido.
 * 
 * Esta função gera um CNPJ alfanumérico válido. O CNPJ gerado é composto por uma base alfanumérica
 * e os dois dígitos verificadores calculados com base nela.
 * 
 * @returns {string} O CNPJ alfanumérico gerado, como uma string de 14 caracteres, contendo letras e números, sem formatação.
 * 
 * @example
 * // Retorna um CNPJ alfanumérico válido, como 'OGZP0N77444Y42'
 * generateAlphanumeric();
 */
function generateAlphanumeric(): string {
  const baseCNPJ = generateBaseAlphanumeric();
  const [firstDigit, secondDigit] = calculateCheckDigits(baseCNPJ);
  const alphanumericCNPJ = [...baseCNPJ, firstDigit, secondDigit];
  return alphanumericCNPJ.join("");
}

/**
 * Gera a base alfanumérica de um CNPJ.
 * 
 * Esta função gera uma base alfanumérica aleatória composta por 12 caracteres,
 * sendo que cada posição pode conter um número (de 0 a 9) ou uma letra (A-Z).
 * A escolha entre número e letra é feita aleatoriamente para cada posição.
 * 
 * @returns {(number | string)[]} Um array de 12 elementos, que podem ser números ou letras,
 * representando a base alfanumérica do CNPJ.
 * 
 * @example
 * // Retorna algo como [2, 'F', 5, 'G', 8, 'B', 0, 'A', 1, 'C', 3, 'D']
 * generateBaseAlphanumeric();
 */
function generateBaseAlphanumeric(): (number | string)[] {
  const base = [];
  for (let i = 0; i < 12; i++) {
    const randomChoice = Math.random() < 0.5;
    if (randomChoice) {
      base.push(Math.floor(Math.random() * 10));
    } else {
      const letter = ALPHABET.charAt(
        Math.floor(Math.random() * ALPHABET.length)
      );
      base.push(letter);
    }
  }
  return base;
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
function calculateCheckDigits(baseCNPJ: (number | string)[]): number[] {
  const firstDigit = calculateCheckDigit(baseCNPJ);
  const secondDigit = calculateCheckDigit([...baseCNPJ, firstDigit]);
  return [firstDigit, secondDigit];
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
function calculateCheckDigit(digits: (number | string)[]): number {
  let sum = 0;
  let weight = 2;

  for (let i = digits.length - 1; i >= 0; i--) {
    const digit = digits[i];
    const numericDigit =
      typeof digit === "string" ? convertLetterToNumber(digit) : digit;
    sum += numericDigit * weight;
    weight = weight === 9 ? 2 : weight + 1;
  }

  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
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
function convertLetterToNumber(digit: string): number {
  const letterMap: { [key: string]: number } = {
    A: 17,
    B: 18,
    C: 19,
    D: 20,
    E: 21,
    F: 22,
    G: 23,
    H: 24,
    I: 25,
    J: 26,
    K: 27,
    L: 28,
    M: 29,
    N: 30,
    O: 31,
    P: 32,
    Q: 33,
    R: 34,
    S: 35,
    T: 36,
    U: 37,
    V: 38,
    W: 39,
    X: 40,
    Y: 41,
    Z: 42,
  };
  return letterMap[digit] || 0;
}

/**
 * Valida um CNPJ alfanumérico através dos dígitos verificadores.
 * 
 * A função converte o CNPJ alfanumérico em uma sequência de números, calcula os dígitos verificadores
 * e os compara com os dois últimos dígitos do CNPJ fornecido para garantir sua validade.
 * 
 * @param cnpj - O CNPJ alfanumérico a ser validado, que pode estar no formato com ou sem pontuação.
 * 
 * @returns {boolean} Retorna `true` se o CNPJ alfanumérico for válido e `false` caso contrário.
 * 
 * @example
 * // Retorna true se o CNPJ alfanumérico for válido
 * validateAlfanumeric("OGZP0N77444Y42");
 * 
 * // Retorna false se o CNPJ alfanumérico for inválido
 * validateAlfanumeric("OGZP0N77444Y40");
 */
function validateAlphanumeric(cnpj: string): boolean {
  const digits = convertCnpj(cnpj.length === CNPJ_LENGTH ? cnpj.slice(0, 12) : cnpj);
  const [dv1, dv2] = calculateCheckDigits(digits);
  const twoFinalDigitsOriginal = parseInt(cnpj.slice(-2));
  const twoFinalDigitsCalculated = parseInt(`${dv1}${dv2}`);
  return twoFinalDigitsOriginal === twoFinalDigitsCalculated;
}

/**
 * Converte um CNPJ alfanumérico para um array de números, onde as letras são convertidas para números 
 * de acordo com uma tabela de mapeamento definida.
 * 
 * @param cnpj - O CNPJ alfanumérico a ser convertido (ex: "OG.ZP0.N77/444Y-42").
 * 
 * @returns {number[]} Retorna um array de números representando o CNPJ, com as letras convertidas para números.
 * 
 * @example
 * convertCnpj("OG.ZP0.N77/444Y-42"); 
 * // Retorna: [31, 32, 0, 15, 29, 42, 0, 39, 7, 7, 4, 4, 4, 31, 42]
 */
function convertCnpj(cnpj: string): number[] {
  return Array.from(cnpj).map((item) =>
    isNaN(Number(item)) ? convertLetterToNumber(item) : +item
  );
}

export { generateAlphanumeric, validateAlphanumeric, convertCnpj };
