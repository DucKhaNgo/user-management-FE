import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

import FilterBar from './FilterBar';
import TableAdmins from './TableAdmins';
import { fetchAdmins } from 'APIService/admin';
import useAPILoading from 'hooks/useAPILoading';
import useRouterQuery from 'hooks/useRouterQuery';
import usePrevious from 'hooks/usePrevious';
import getPaginationParams from 'utils/getPaginationParams';

const { Content } = Layout;

const AdminsPage = (props) => {
  const [getAdmin, loading] = useAPILoading(fetchAdmins);
  const [params, setParams] = useRouterQuery({
    pagination: { current: 1, pageSize: 10 },
    filter: {},
  });
  const prevParams = usePrevious(params);

  const [resData, setResData] = useState();

  useEffect(() => {
    if (!isEqual(prevParams, params))
      getAdmin(getPaginationParams(params)).then(({ data }) => {
        console.log('data: ', data);
        setResData(data);
      });
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTableChange = (pagination = {}) => {
    const { current, pageSize } = pagination;
    setParams({ ...params, pagination: { current, pageSize } });
  };

  return (
    <Content
      style={{
        padding: 20,
        background: 'white',
        borderTop: '1px black solid',
      }}>
      <FilterBar initialValues={params.filter} loading={loading} />
      <TableAdmins
        dataSource={get(resData, 'data')}
        pagination={{ ...params.pagination, total: get(resData, 'total') }}
        loading={loading}
        onChange={handleTableChange}
      />
    </Content>
  );
};

export default AdminsPage;
