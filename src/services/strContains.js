import { removeAccents } from './removeAccents';

export const strContains = (str, strToContain) => {
  str = removeAccents(str).toUpperCase();
  strToContain = removeAccents(strToContain).toUpperCase();
  return str.includes(strToContain);
};
