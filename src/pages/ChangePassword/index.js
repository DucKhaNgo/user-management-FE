import { Form, Input, Button, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckOutlined, KeyOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import useAPILoading from 'hooks/useAPILoading';
import usePasswordRules from 'hooks/FormItemRules/usePasswordRules';
import ChangePasswordStyled from './styled';
import { changePassword } from 'APIService/authorization';

const HomePage = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const passwordRules = usePasswordRules();
  const [callChangePassword, loading] = useAPILoading(changePassword);

  const onFinish = (values) => {
    callChangePassword(values).then(() => {
      notification.success({
        message: t('changePasswordSuccess'),
        placement: 'bottomRight',
      });
      history.push('/');
    });
  };

  return (
    <ChangePasswordStyled>
      <div className='position-center'>
        <div className='popup-login'>
          <h1 className='title'>{t('changePassword')}</h1>
          <Form name='basic' onFinish={onFinish}>
            <Form.Item name='currentPassword' rules={passwordRules}>
              <Input.Password
                placeholder={t('currentPassword')}
                prefix={<KeyOutlined />}
              />
            </Form.Item>

            <Form.Item name='newPassword' rules={passwordRules}>
              <Input.Password
                placeholder={t('newPassword')}
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item
              name='confirmNewPassword'
              dependencies={['newPassword']}
              rules={[
                {
                  required: true,
                  message: t('error:password.required'),
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(t('passwordNotMatch'));
                  },
                }),
              ]}>
              <Input.Password
                placeholder={t('confirmNewPassword')}
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Button
              block
              type='primary'
              htmlType='submit'
              loading={loading}
              icon={<CheckOutlined />}></Button>
          </Form>
        </div>
      </div>
    </ChangePasswordStyled>
  );
};

export default HomePage;
