import cpf from "./cpf";
import cnpj from "./cnpj";

export { cpf, cnpj };

export const documentValidator = (joi: any) => ({
  type: "document",
  base: joi.string().allow(null).messages({
    "string.empty": "{{#label}} não pode ser vazio",
    "any.required": "{{#label}} é obrigatório",
  }),
  messages: {
    "document.cpf": "CPF inválido",
    "document.cnpj": "CNPJ inválido",
  },
  rules: {
    cpf: {
      validate(value: any, helpers: any) {
        if (value !== null && !cpf.isValid(value)) 
          return helpers.error("document.cpf");
        
        return value;
      },
    },
    cnpj: {
      validate(value: any, helpers: any) {
        if (value !== null && !cnpj.isValid(value))
          return helpers.error("document.cnpj");

        return value;
      },
    },
  },
});

export default documentValidator;

