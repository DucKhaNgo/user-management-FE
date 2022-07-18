import { Layout, Row, Col } from 'antd';
import { UnorderedListOutlined, ShopOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { userInfoEmailSelector } from '../../reduxStore/auth/selectors';
import BlockWidget from './BlockWidget';

const WelcomeStyle = styled.div`
  margin: 20px 0px 0px 25px;
  font-size: 20px;
  color: #303030;
  .emailUser {
    font-weight: bold;
  }
`;

const { Content } = Layout;
const HomePage = () => {
  const { t } = useTranslation();
  const userEmail = useSelector(userInfoEmailSelector);

  return (
    <Content>
      <WelcomeStyle>
        <div>
          <span>Welcome</span> <span className='emailUser'>{userEmail}</span>!
        </div>
      </WelcomeStyle>
      <Row>
        <Col xs={24} sm={12} lg={8}>
          <BlockWidget
            name={t('User Management')}
            href='/user'
            icon={<ShopOutlined />}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default HomePage;
