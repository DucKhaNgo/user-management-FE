import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

import LayoutLogin from 'components/LayoutLogin';
import { resetPassword } from 'APIService/authorization';
import useAPILoading from 'hooks/useAPILoading';
import FormResetPassword from './FormResetPassword';

const ForgetPassword = (props) => {
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const { t } = useTranslation();
  const [callResetPassword, loading] = useAPILoading(resetPassword);
  let { token } = useParams();

  const onFinish = useCallback(
    (values) => {
      callResetPassword(token, values.newPassword).then(() => {
        setResetPasswordSuccess(true);
      });
    },
    [callResetPassword, token],
  );
  return (
    <LayoutLogin>
      {resetPasswordSuccess ? (
        <div>
          <h1 className='title'>{t('resetPassword')}</h1>
          <h3>{t('changePasswordSuccess')}</h3>
          <Button block type='primary'>
            <Link to='/login'> {t('login')}</Link>
          </Button>
        </div>
      ) : (
        <FormResetPassword onFinish={onFinish} loading={loading} />
      )}
    </LayoutLogin>
  );
};

export default ForgetPassword;
