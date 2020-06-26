import axios from 'axios';

const cepApi = axios.create({
  baseURL: 'https://api.postmon.com.br/v1/cep/',
});

export default cepApi;
