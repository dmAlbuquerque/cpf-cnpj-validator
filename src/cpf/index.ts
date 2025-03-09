import { CPF_LENGTH } from "../constants";

interface CPFOptions {
  formatted?: boolean;
}

/**
 * Gera um número de CPF.
 * 
 * Esta função gera um CPF válido. O CPF gerado pode ser retornado com ou sem a formatação.
 * 
 * @param {CPFOptions} [options] - Opções para a geração do CPF.
 * @param {boolean} [options.formatted] - Se verdadeiro, retorna o CPF formatado (com pontos e traço). 
 * Caso contrário, retorna o CPF sem formatação (apenas números).
 * 
 * @returns {string} O CPF gerado, podendo ser formatado ou não, conforme as opções fornecidas.
 * 
 * @example
 * // Retorna um CPF sem formatação, como '07208766053'
 * generate();
 * 
 * @example
 * // Retorna um CPF formatado, como '072.087.660-53'
 * generate({ formatted: true });
 */
export function generate(options?: CPFOptions): string {
  const baseCPF = generateBaseCPF();
  const firstDigit = calculateCheckDigit(baseCPF);
  const secondDigit = calculateCheckDigit([...baseCPF, firstDigit]);

  const cpf = [...baseCPF, firstDigit, secondDigit].join("");

  return options?.formatted ? format(cpf) : cpf;
}

/**
 * Valida um CPF.
 * 
 * A função limpa a string do CPF, verifica o formato e calcula os dois dígitos verificadores
 * para garantir que o CPF fornecido seja válido. 
 * 
 * @param cpf - O CPF a ser validado, que pode estar no formato com ou sem pontuação.
 * 
 * @returns {boolean} Retorna `true` se o CPF for válido e `false` caso contrário.
 * 
 * @example
 * // Retorna true se o CPF for válido
 * isValid("251.438.150-00");
 * 
 * // Retorna false se o CPF for inválido
 * isValid("251.438.150-01");
 */
export function isValid(cpf: string): boolean {
  const cleanedCPF = cleanCPF(cpf);

  if (!isValidFormat(cleanedCPF)) return false;

  const digits = cleanedCPF.split("").map(Number);
  const baseCPF = digits.slice(0, 9);

  const firstDigit = calculateCheckDigit(baseCPF);
  const secondDigit = calculateCheckDigit([...baseCPF, firstDigit]);

  return firstDigit === digits[9] && secondDigit === digits[10];
}

/**
 * Remove qualquer caractere não numérico de um CPF.
 * 
 * @param cpf - O CPF que será limpo.
 * 
 * @returns {string} Retorna o CPF sem formatação, contendo apenas os números.
 * 
 * @example
 * // Retorna "25143815000"
 * cleanCPF("251.438.150-00");
 * 
 * // Retorna "25143815001"
 * cleanCPF("251-438-150/01");
*/
function cleanCPF(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

/**
 * Verifica se o formato de um CPF é válido, considerando seu comprimento e se não é uma sequência repetitiva.
 * 
 * @param cpf - O CPF a ser verificado, que já deve estar limpo (sem pontuação).
 * 
 * @returns {boolean} Retorna `true` se o CPF tiver um formato válido e `false` caso contrário.
 * 
 * @example
 * // Retorna true se o CPF for válido
 * isValidFormat("25143815000");
 * 
 * // Retorna false para sequências repetitivas
 * isValidFormat("11111111111");
 * 
 * // Retorna false para o CPF "12345678909"
 * isValidFormat("12345678909");
 */
function isValidFormat(cpf: string): boolean {
  if (cpf.length !== CPF_LENGTH) return false;
  return !/^(\d)\1+$/.test(cpf) && cpf !== "12345678909"; // Reject sequences like 111.111.111-11
}

/**
 * Gera um CPF base aleatório com 9 dígitos numéricos.
 * 
 * Cria um array de 9 dígitos aleatórios, que são usados como a base para a geração
 * de um CPF. Cada dígito é gerado de forma independente e está no intervalo de 0 a 9.
 * 
 * @returns {number[]} Um array de 9 números inteiros, representando a base de um CPF.
 * 
 * @example
 * // Retorna um array com 9 dígitos aleatórios
 * generateBaseCPF(); 
 * // Exemplo de retorno: [4, 7, 2, 8, 3, 1, 0, 9, 6]
 */
function generateBaseCPF(): number[] {
  return Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));
}

/**
 * Calcula o dígito verificador de um CPF (ou CNPJ) com base em uma sequência de números.
 * 
 * A função utiliza um algoritmo que multiplica cada número da sequência por um peso específico
 * e, em seguida, calcula o módulo 11 da soma obtida. Dependendo do resultado, o dígito verificador
 * é determinado. Se o resto da divisão for menor que 2, o dígito verificador será 0; caso contrário,
 * será 11 menos o resto.
 * 
 * @param numbers - Um array de números que representa a base do CPF (ou CNPJ) sem o dígito verificador.
 * 
 * @returns {number} O dígito verificador calculado.
 * 
 * @example
 * // Retorna 7 (dígito verificador calculado)
 * calculateCheckDigit([4, 7, 2, 8, 3, 1, 0, 9, 6]);
 */
function calculateCheckDigit(numbers: number[]): number {
  const weight = numbers.length + 1;
  const sum = numbers.reduce(
    (acc, num, index) => acc + num * (weight - index),
    0
  );
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

/**
 * Formata um CPF removendo a pontuação e aplicando o formato padrão: XXX.XXX.XXX-XX.
 * 
 * A função utiliza uma expressão regular para capturar os grupos de três números seguidos por dois 
 * números e os separa utilizando os caracteres de pontuação padrão para CPF (ponto e hífen).
 * 
 * @param cpf - O CPF a ser formatado, que deve estar no formato numérico (sem pontuação).
 * 
 * @returns {string} O CPF formatado no padrão XXX.XXX.XXX-XX.
 * 
 * @example
 * // Retorna "123.456.789-01"
 * format("12345678901");
 */

function format(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export default {
  generate,
  isValid,
  format,
};
