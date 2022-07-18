import { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { login } from 'APIService/authorization';
import useAPILoading from 'hooks/useAPILoading';
import usePasswordRules from 'hooks/FormItemRules/usePasswordRules';
import authAction from 'reduxStore/auth/actions';
import { useDispatch } from 'react-redux';

const PageLogin = ({ onLoginSuccess }) => {
  const { t } = useTranslation();
  const [callLogin, loading] = useAPILoading(login);
  const dispatch = useDispatch();

  const onFinish = useCallback(
    (values) => {
      callLogin(values.email, values.password).then((res) => {
        onLoginSuccess(values);
        const { data = {} } = res;
        console.log('data: ', data);
        if (data.token) {
          const actionPayload = authAction.login(data.userInfo, data.token);
          dispatch(actionPayload);
        }
      });
    },
    [callLogin, onLoginSuccess, dispatch],
  );

  return (
    <>
      <Form
        name='basic'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}>
        <h1 className='title'>{t('login')}</h1>
        <Form.Item
          name='email'
          rules={[
            {
              required: true,
              message: t('error:email.required'),
            },
            {
              type: 'email',
              message: t('error:email.valid'),
            },
          ]}>
          <Input placeholder={t('email')} prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item name='password' rules={usePasswordRules()}>
          <Input.Password
            placeholder={t('password')}
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Button block type='primary' htmlType='submit' loading={loading}>
          {t('continue')}
        </Button>
      </Form>
      <Button block type='link'>
        <Link to='/forgot-password'> {t('forgotPassword')}</Link>
      </Button>
    </>
  );
};

export default PageLogin;
