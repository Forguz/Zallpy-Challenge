import * as VMasker from 'vanilla-masker';

// lida com os eventos do input
export function inputHandler(masks, max, event) {
  const c = event.target;
  const v = c.value && c.value.replace(/\D/g, '');
  const m = c.value.length > max ? 1 : 0;
  VMasker(c).unMask();
  VMasker(c).maskPattern(masks[m]);
  c.value = VMasker.toPattern(v, masks[m]);
}

// cria a mascara do campo
export function createMask(el, masks) {
  VMasker(el).maskPattern(masks[0]);
  el.addEventListener('input', inputHandler.bind(undefined, masks, 14), false);
}

export const cpfMasks = ['999.999.999-99'];
export const telMasks = ['(99) 9999-99999'];
export const cepMasks = ['99999-999'];
