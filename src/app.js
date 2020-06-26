import { createMask, cpfMasks, telMasks, cepMasks } from './utils/masks';
import { getUfs } from './utils/ufSearch';
import { validate } from 'valirator';
import { searchCep } from './utils/cepSearch';
import schema from './config/valiratorSchema';

export default async function App() {
  const cepElement = document.querySelector('#cep');
  const ufElement = document.querySelector('#uf');

  createMask(document.querySelector('#tel'), telMasks);
  createMask(document.querySelector('#cpf'), cpfMasks);
  createMask(cepElement, cepMasks);

  const ufs = await getUfs();

  ufs.forEach(uf => {
    const option = document.createElement('option');
    option.value = option.textContent = uf;
    ufElement.appendChild(option);
  });

  cepElement.addEventListener('focusout', e => setAddressValues(e));

  document.querySelector('#form_register').addEventListener('submit', e => submitForm(e));
};

async function setAddressValues(e) {
  if(e.target.value.length === 9) {
    const cepInfo = await searchCep(e.target.value) || {};

    if(cepInfo.cidade) {
      document.querySelector('#cidade').value = cepInfo.cidade;
    }

    if(cepInfo.bairro) {
      document.querySelector('#bairro').value = cepInfo.bairro;
    }

    for(let option of ufElement.options) {
      if(cepInfo.estado && option.value === cepInfo.estado) {
        option.selected = true;
      }
    }
  }
}

async function submitForm(e) {
  e.preventDefault();
  const form = document.forms["form_register"];

  const formData = {
    name: form["name"].value,
    cpf: form["cpf"].value,
    nascimento: form["nascimento"].value,
    tel: form["tel"].value,
    email: form["email"].value,
    descricao: form["descricao"].value,
    cep: form["cep"].value,
    uf: form["uf"].options[form["uf"].selectedIndex].value,
    cidade: form["cidade"].value,
    logradouro: form["logradouro"].value,
    bairro: form["bairro"].value,
    numero: form["numero"].value,
    complemento: form["complemento"].value,
  }

  const validation = await validate(schema, formData);
  console.log(validation);
  handleInputErrors(validation, formData);

  if(!validation.isValid()) {
    document.querySelector('#span_error').style.display = 'block';
  } else {
    document.querySelector('#span_error').style.display = 'none';
  }
}

function handleInputErrors(validation, formData) {
  const campsWithError = Object.keys(validation.getErrors());
  const allCamps = Object.keys(formData);

  allCamps.forEach(elName => {
    document.querySelector(`#${elName}`).classList.remove('error');
  });

  campsWithError.forEach(elName => {
    document.querySelector(`#${elName}`).classList.add('error');
  });
}
