import moment from 'moment';
import 'moment/locale/ms-my';

import i18n from 'i18n';
moment.updateLocale('en', {
  week: {
    dow: 1, //first day of week is monday
  },
});

export const mapLanguageToLocale = {
  my: 'ms-my',
  en: 'en',
};
moment.locale(mapLanguageToLocale[i18n.language]);
