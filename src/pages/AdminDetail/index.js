import { notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import useAPILoading from 'hooks/useAPILoading';
import { createAdmin } from 'APIService/admin';
import FormAdminDetail from './FormAdminDetail';
import { generateRandomString } from 'utils';

const CreateAdmin = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [callCreateAdmin, loading] = useAPILoading(createAdmin);
  const adminDefault = {
    isActive: true,
    password: generateRandomString(8),
    role: 'admin',
  };

  const onCreateAdmin = (admin) => {
    callCreateAdmin(admin).then(() => {
      notification.success({
        message: t('createSuccess'),
        placement: 'bottomRight',
      });
      history.goBack();
    });
  };

  return (
    <div>
      <h1> {'Create User'} </h1>
      <FormAdminDetail
        onSubmit={onCreateAdmin}
        loading={loading}
        value={adminDefault}
      />
    </div>
  );
};

export default CreateAdmin;
