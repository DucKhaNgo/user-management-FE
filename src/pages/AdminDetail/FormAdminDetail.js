import React from 'react';
import { Layout, Form, Input, Button, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { CheckOutlined } from '@ant-design/icons';

import SwitchConfirm from 'components/SwitchConfirm';
import usePasswordRules from 'hooks/FormItemRules/usePasswordRules';

const { Content } = Layout;
const { Option } = Select;
const layout = {
  labelCol: { xs: { span: 24 }, md: { span: 5 } },
  wrapperCol: { xs: { span: 24 }, md: { span: 6 } },
};

const tailLayout = {
  wrapperCol: { xs: { offset: 0, span: 24 }, md: { offset: 5, span: 6 } },
};

const FormAdminDetail = ({ value, onSubmit, loading, editMode }) => {
  const { t } = useTranslation();
  const passwordRules = usePasswordRules();

  return (
    <Content
      style={{
        padding: 20,
        background: 'white',
        borderTop: '1px black solid',
      }}>
      <Form
        {...layout}
        colon={false}
        layout='horizontal'
        scrollToFirstError
        onFinish={onSubmit}
        initialValues={value}>
        <Form.Item
          name='email'
          label={t('email')}
          rules={[
            { required: true, message: t('error:email.required') },
            { type: 'email', message: t('error:email.valid') },
          ]}>
          <Input disabled={editMode} />
        </Form.Item>
        {editMode && (
          <Form.Item
            label={t('active')}
            name={'isActive'}
            valuePropName='checked'>
            <SwitchConfirm
              enableConfirm={{
                title: t('confirmActiveAmin.title'),
                content: t('confirmActiveAmin.message'),
              }}
              disableConfirm={{
                title: t('confirmInactiveAdmin.title'),
                content: t('confirmInactiveAdmin.message'),
              }}
            />
          </Form.Item>
        )}
        <Form.Item noStyle dependencies={['isActive']}>
          {(form) => {
            const isActive = form.getFieldValue('isActive');
            return (
              <div>
                {!editMode && (
                  <Form.Item
                    name='password'
                    label={t('password')}
                    rules={passwordRules}>
                    <Input disabled={!isActive} />
                  </Form.Item>
                )}
                <Form.Item name='role' label={t('role')}>
                  <Select defaultValue='admin'>
                    <Option value='admin'>{'admin'}</Option>
                    <Option value='mentor'>{'mentor'}</Option>
                    <Option value='student'>{'student'}</Option>
                  </Select>
                </Form.Item>
              </div>
            );
          }}
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button
            block
            type='primary'
            htmlType='submit'
            loading={loading}
            icon={<CheckOutlined />}></Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default FormAdminDetail;
