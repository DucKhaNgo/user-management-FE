import 'antd/dist/antd.css';
import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from 'pages/Login';
import ForgotPassword from 'pages/ForgotPassword';
import ResetPassword from 'pages/ResetPassword';
import { useSelector, useDispatch } from 'react-redux';
import {
  isLoggedInSelector,
  initPageFinishSelector,
} from 'reduxStore/auth/selectors';
import { Spin } from 'antd';
import styled from 'styled-components';
import authAction from 'reduxStore/auth/actions';
import AuthorizedRoutes from './AuthorizedRoutes';
//run initial setting
import 'setting';

const CenterScreenStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function App() {
  const isLoggedIn = useSelector(isLoggedInSelector);
  const initPageFinish = useSelector(initPageFinishSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authAction.loginByToken());
  }, [dispatch]);

  if (!initPageFinish)
    return (
      <CenterScreenStyle>
        <Spin size='large' />
      </CenterScreenStyle>
    );

  if (!isLoggedIn) {
    return (
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/reset-password/:token' exact component={ResetPassword} />
        <Route path='/forgot-password' exact component={ForgotPassword} />
        <Redirect to='/login' />
      </Switch>
    );
  }

  return <AuthorizedRoutes />;
}
