import api from '../services/ufApi';

export async function getUfs() {
  try {
    const response = await api.get('/localidades/estados/');
    const ufStates = response.data;

    const ufs = ufStates.map(state => {
      return state.sigla;
    });

    return ufs.sort();
  } catch (err) {
    console.log(err);
  }
};
