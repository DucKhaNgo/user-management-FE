import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';

import LayoutLogin from 'components/LayoutLogin';
import { forgetPassword } from 'APIService/authorization';
import useAPILoading from 'hooks/useAPILoading';
import FormForgotPassword from './FormForgotPassword';
import { Link } from 'react-router-dom';

const ForgetPassword = (props) => {
  const [emailSendSuccess, setEmailSendSuccess] = useState();
  const { t } = useTranslation();
  const [callForgetPassword, loading] = useAPILoading(forgetPassword);

  const onFinish = useCallback(
    (values) => {
      callForgetPassword(values.email).then(() => {
        setEmailSendSuccess(values.email);
      });
    },
    [callForgetPassword],
  );
  return (
    <LayoutLogin>
      {emailSendSuccess ? (
        <div>
          <h1 className='title'>{t('forgotPass.emailSent')}</h1>
          <div>{t('forgotPass.message1')}</div>
          <h3>
            <b>{emailSendSuccess}</b>
          </h3>
          <p>{t('forgotPass.message2')}</p>
          <Link to='/login'>
            <Button block type='link'>
              {t('backToLogin')}
            </Button>
          </Link>
        </div>
      ) : (
        <FormForgotPassword onFinish={onFinish} loading={loading} />
      )}
    </LayoutLogin>
  );
};

export default ForgetPassword;
