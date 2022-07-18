import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import PopupLogout from './PopupLogout';
import LayoutStyled from './styled';
import { mapLanguageToLocale } from 'setting/moment';
const { Sider } = Layout;
const { SubMenu } = Menu;

export default function PageLayout(props) {
  const { routes } = props;
  const { t, i18n } = useTranslation();
  const [openModalLogout, setOpenModalLogout] = useState(false);
  const location = useLocation();

  const onClickChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    moment.locale(mapLanguageToLocale[lang]);
  };

  const showModalLogout = () => {
    setOpenModalLogout(true);
  };
  const onClosePopup = () => {
    setOpenModalLogout(false);
  };

  const routesToShow = useMemo(() => {
    return routes.filter((route) => {
      const { showOnSideBar = true } = route;
      return showOnSideBar;
    });
  }, [routes]);

  const selectedMenuItem = useMemo(() => {
    const selectedIndex = routesToShow.findIndex((route) =>
      route.path.includes(location.pathname),
    );
    return [selectedIndex + ''];
  }, [location.pathname, routesToShow]);

  return (
    <LayoutStyled>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider className='ant-sider' breakpoint='md' collapsedWidth='0'>
          <Menu theme='dark' mode='inline' selectedKeys={selectedMenuItem}>
            {routesToShow.map((routeItem, index) => (
              <Menu.Item key={index} icon={routeItem.icon}>
                <Link to={routeItem.path}>{t(routeItem.name)}</Link>
              </Menu.Item>
            ))}
          </Menu>

          <Menu
            theme='dark'
            mode='vertical'
            className='menu-fixed-bottom'
            selectedKeys={[i18n.language]}>
            <SubMenu title={t('account')} icon={<UserOutlined />}>
              <Menu.Item>
                <Link to='/account/change-password'>{t('changePassword')}</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item onClick={showModalLogout} icon={<LogoutOutlined />}>
              {t('logOut.label')}
            </Menu.Item>
          </Menu>
        </Sider>
        <PopupLogout visible={openModalLogout} onClose={onClosePopup} />

        <Layout className='site-layout'>
          {props.children}{' '}
          <div className='footer-text'>
            <span>&bull;&nbsp;&nbsp;Version {1.0}</span>
          </div>
        </Layout>
      </Layout>
    </LayoutStyled>
  );
}
