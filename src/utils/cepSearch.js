import api from '../services/cepApi';

export async function searchCep(cep) {
  try {
    const response = await api.get(cep);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}
