export default {
  name: {
    required: true,
    minLength: 3,
  },
  cpf: {
    required: true,
    minLength: 14
  },
  nascimento: {
    required: true,
    format: 'date'
  },
  tel: {
    required: true,
    minLength: 15
  },
  email: {
    required: true,
    format: 'email',
  },
  descricao: {
    required: false,
  },
  cep: {
    required: true,
    minLength: 9,
  },
  uf: {
    required: true,
    minLength: 2,
  },
  cidade: {
    required: true,
    minLength: 3,
  },
  logradouro: {
    required: true,
    minLength: 3,
  },
  bairro: {
    required: true,
    minLength: 3,
  },
  numero: {
    required: true,
    minLength: 1,
  },
  complemento: {
    required: false,
  },
}
