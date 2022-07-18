import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import get from 'lodash/get';
import { useHistory } from 'react-router-dom';
import TableResizable from 'components/antdCustom/TableResizable';
import { userInfoSelector } from 'reduxStore/auth/selectors';
import { deleteUser } from 'APIService/admin';
import useAPILoading from 'hooks/useAPILoading';

import { Button } from 'antd';

const getColumnsTranslated = (t, useRole, callDeleteUser) => [
  {
    title: t('id'),
    dataIndex: 'id',
    key: 'id',
    width: '70px',
  },
  {
    title: t('email'),
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: t('role'),
    dataIndex: 'role',
    key: 'role',
    render: (role = '') => role.toUpperCase(),
  },
  useRole === 'admin' && {
    title: 'DELETE',
    dataIndex: 'id',
    render: (id) => <Button onClick={(id) => callDeleteUser(id)}>DELETE</Button>
  }
];

const TableAdminStyled = styled.div`
  .inactive {
    opacity: 0.3;
  }
  .row {
    cursor: pointer;
  }
`;

const TableAdmins = (props) => {
  const { dataSource, loading, onChange, pagination } = props;
  const { t } = useTranslation();
  const userInfo = useSelector(userInfoSelector);
  const useRole = userInfo && userInfo.role;
const [callDeleteUser] = useAPILoading(deleteUser);
  const columns = useMemo(() => getColumnsTranslated(t, useRole, callDeleteUser), [t]);
  return (
    <TableAdminStyled>
      <TableResizable
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onChange}
        pagination={pagination}
        scroll={{ y: 'calc(100vh - 300px)' }}
        rowClassName={(admin) => {
          const is_active = get(admin, 'is_active', true);
          if (is_active) return 'row';
          return 'row inactive';
        }}
      />
    </TableAdminStyled>
  );
};

export default TableAdmins;
