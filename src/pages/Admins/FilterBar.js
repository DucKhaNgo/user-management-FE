import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { userInfoSelector } from 'reduxStore/auth/selectors';
import { useSelector } from 'react-redux';

const FilterBar = (props) => {
  const { t } = useTranslation();
  const userInfo = useSelector(userInfoSelector);
  const useRole = userInfo && userInfo.role;
  return (
    <>
      {useRole === 'admin' && (
        <Link to='/admins/create'>
          <Button type='primary' icon={<PlusOutlined />}>
            {'Create User'}
          </Button>
        </Link>
      )}
    </>
  );
};

export default FilterBar;
