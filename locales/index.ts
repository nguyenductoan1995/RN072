import I18n from 'react-native-i18n';
import en from './en';

I18n.fallbacks = true;

I18n.translations = {
  en,
};

export const t = (...args) => I18n.t(...args);
export default I18n;
