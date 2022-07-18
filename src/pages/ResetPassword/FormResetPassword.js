import { Form, Input, Button } from 'antd';
import { CheckOutlined, LockOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import usePasswordRules from 'hooks/FormItemRules/usePasswordRules';

const FormResetPassword = (props) => {
  const { t } = useTranslation();
  const { onFinish, loading } = props;
  return (
    <Form
      name='basic'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}>
      <h1 className='title'>{t('resetPassword')}</h1>
      <Form.Item name='newPassword' rules={usePasswordRules()}>
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
        icon={<CheckOutlined />}>
        {t('resetPassword')}
      </Button>
    </Form>
  );
};

export default FormResetPassword;
