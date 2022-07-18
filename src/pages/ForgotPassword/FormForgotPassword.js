import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const FormForgotPassword = (props) => {
  const { t } = useTranslation();
  const { onFinish, loading } = props;

  return (
    <div>
      <Form
        name='basic'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}>
        <h1 className='title'>{t('forgotPassword')}</h1>
        <p>{t('forgotPass.messageEnterMail')}</p>
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

        <Button
          block
          type='primary'
          htmlType='submit'
          loading={loading}
          icon={<CheckOutlined />}>
          {t('resetPassword')}
        </Button>
      </Form>

      <div className='back-to-login'>
        <Link to='/login'>
          <Button block type='link'>
            {t('backToLogin')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FormForgotPassword;
