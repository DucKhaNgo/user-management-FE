import { useCallback } from 'react';
import { Form, Button, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CheckOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import InputOTP from 'components/InputOTP';
import { login, verifyEmailCode } from 'APIService/authorization';
import authAction from 'reduxStore/auth/actions';
import useAPILoading from 'hooks/useAPILoading';
import useCountDown from 'hooks/useCountDown';

const PageLogin = ({ onGoBack, currentAccount }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [timeLeft, resetTimer] = useCountDown(90);
  const [callLogin, loadingLogin] = useAPILoading(login);
  const [callVerifyEmailCode, loadingVerifyEmail] = useAPILoading(
    verifyEmailCode,
  );

  const onResendEmail = () => {
    callLogin(currentAccount.email, currentAccount.password).then(() => {
      resetTimer();
      notification.success({
        message: t('emailVerifySent'),
        placement: 'bottomRight',
      });
    });
  };

  const onFinish = useCallback(
    (values) => {
      callVerifyEmailCode(currentAccount.email, values.digit).then((res) => {
        const { data = {} } = res;

        if (data.token) {
          const actionPayload = authAction.login(data.adminInfo, data.token);
          dispatch(actionPayload);
        }
      });
    },
    [callVerifyEmailCode, currentAccount.email, dispatch],
  );

  return (
    <Form
      className='title'
      name='basic'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}>
      <h1 className='title'>{t('verifyEmail')}</h1>
      <Button
        className='btn-back'
        type='link'
        icon={<ArrowLeftOutlined />}
        onClick={onGoBack}
      />
      <div className='message-sent-mail'>{t('emailVerifySent')}</div>
      <Form.Item
        name='digit'
        rules={[
          {
            len: 6,
            required: true,
            message: t('error:digit'),
          },
        ]}>
        <InputOTP
          numInputs={6}
          separator={<span>-</span>}
          inputStyle='ant-input'
        />
      </Form.Item>
      <Button
        block
        type='primary'
        htmlType='submit'
        loading={loadingVerifyEmail}
        icon={<CheckOutlined />}></Button>

      <Button
        block
        type='link'
        onClick={onResendEmail}
        loading={loadingLogin}
        disabled={loadingVerifyEmail || timeLeft > 0}>
        {t('resendEmail')} {timeLeft > 0 ? `(${timeLeft})` : ''}
      </Button>
    </Form>
  );
};

export default PageLogin;
