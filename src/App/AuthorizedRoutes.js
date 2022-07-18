import 'antd/dist/antd.css';
import { useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Home from 'pages/Home';
import ChangePassword from 'pages/ChangePassword';
import AdminsPage from 'pages/Admins';
import CreateAdminPage from 'pages/AdminDetail';
import EditAdmin from 'pages/AdminDetail/Edit';
import Layout from 'components/Layout';
import { userInfoSelector } from 'reduxStore/auth/selectors';

const getRoutes = (userRole) =>
  [
    {
      path: '/',
      component: Home,
      name: 'routeName.home',
      icon: <HomeOutlined />,
      exact: true,
    },
    {
      path: '/account/change-password',
      component: ChangePassword,
      showOnSideBar: false,
      exact: true,
    },
    {
      path: '/user',
      component: AdminsPage,
      exact: true,
      name: 'User Management',
      icon: <UserOutlined />,
    },
    {
      path: '/admins/create',
      component: CreateAdminPage,
      showOnSideBar: false,
      exact: true,
    },
    {
      path: '/admins/:id',
      component: EditAdmin,
      showOnSideBar: false,
      exact: true,
    },
  ].filter(Boolean);

const AuthorizedRoutes = (props) => {
  const userInfo = useSelector(userInfoSelector);
  const useRole = userInfo && userInfo.role;
  const routes = useMemo(() => getRoutes(useRole), [useRole]);
  const defaultRoute = routes[0];
  return (
    <Layout routes={routes}>
      <Switch>
        {routes.map((routeItem, index) => (
          <Route
            key={index}
            path={routeItem.path}
            component={routeItem.component}
            render={routeItem.render}
            exact={routeItem.exact}
          />
        ))}

        {defaultRoute && <Redirect to={defaultRoute.path} />}
      </Switch>
    </Layout>
  );
};
export default AuthorizedRoutes;
