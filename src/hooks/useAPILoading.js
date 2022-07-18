import { useState, useCallback, useRef, useEffect } from 'react';
import { notification } from 'antd';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';

/**
 * @param {function} apiFunction Function of requesting api
 * @param {boolean} [shouldAlertOnError=true] Should show message of failing. Default is true
 * @returns {Array} [apiFunctionWithLoading, loading]
 */
const useAPI = (apiFunction, shouldAlertOnError = true) => {
  const isUnmounted = useRef(false);

  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  const apiFunctionWithLoading = useCallback(
    (...input) =>
      new Promise((resolve, reject) => {
        setLoading(true);
        apiFunction(...input)
          .then(resolve)
          .catch((err) => {
            if (!isUnmounted.current && shouldAlertOnError) {
              const message =
                get(err, 'response.data.message') ||
                get(err, 'response.data.error') ||
                err.message;

              const translatedMessage = t(`error:${message}`);

              notification.error({
                message: translatedMessage,
                placement: 'bottomRight',
              });
            }
            reject(err);
          })
          .finally(() => {
            setLoading(false);
          });
      }),
    [apiFunction, t, shouldAlertOnError],
  );

  return [apiFunctionWithLoading, loading];
};

export default useAPI;
