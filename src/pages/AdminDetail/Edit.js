import { useState, useEffect } from 'react';
import { notification, Spin, Empty } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory, Link } from 'react-router-dom';
import get from 'lodash/get';
import styled from 'styled-components';

import useAPILoading from 'hooks/useAPILoading';
import { fetchAdminById, updateAdmin } from 'APIService/admin';
import FormAdminDetail from './FormAdminDetail';

const CenterPageStyle = styled.div`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditAdmin = (props) => {
  const id = get(props, 'match.params.id');

  const { t } = useTranslation();
  const history = useHistory();
  const [admin, setAdmin] = useState();
  const [callUpdateAdmin, loading] = useAPILoading(updateAdmin);
  const [getAdminById, loadingGetAdmin] = useAPILoading(fetchAdminById);

  useEffect(() => {
    getAdminById(id).then(({ data }) => {
      setAdmin(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loadingGetAdmin)
    return (
      <CenterPageStyle>
        <Spin size='large' />
      </CenterPageStyle>
    );
  if (!admin)
    return (
      <CenterPageStyle>
        <Empty
          description={
            <span>
              {t('adminNotFound')}{' '}
              <Link to='/admins'>{t('backToAdminManage')}</Link>
            </span>
          }></Empty>
      </CenterPageStyle>
    );

  const onEditAdmin = (admin) => {
    callUpdateAdmin(id, admin).then(() => {
      notification.success({
        message: t('updateSuccess'),
        placement: 'bottomRight',
      });
      history.goBack();
    });
  };

  return (
    <div>
      <h1> {t('editAdmin')} </h1>
      <FormAdminDetail
        editMode
        value={admin}
        onSubmit={onEditAdmin}
        loading={loading}
      />
    </div>
  );
};

export default EditAdmin;
