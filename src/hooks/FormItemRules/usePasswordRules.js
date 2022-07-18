import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const usePasswordRules = () => {
  const { t } = useTranslation();
  return useMemo(() => {
    return [
      {
        required: true,
        message: t('error:password.required'),
      },
      {
        min: 6,
        message: t('error:password.min'),
      },
    ];
  }, [t]);
};

export default usePasswordRules;
