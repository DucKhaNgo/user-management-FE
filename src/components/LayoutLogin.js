import styled from 'styled-components';

import { loginBackground } from 'images';

const LayoutLoginStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-image: url(${loginBackground});
  background-size: cover;
  background-position: center;

  .position-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 350px;
    max-width: calc(100vw - 10px);
    text-align: center;
  }

  .mypay-logo {
    max-width: 100%;
    margin-top: -50px;
    margin-bottom: 30px;
  }

  .popup-login {
    text-align: left;
    background: rgba(255, 255, 255, 0.6);
    color: #333;

    padding: 30px;
    border-radius: 15px;
    box-shadow: 1px 1px 14px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);

    h1,
    h2,
    h3 {
      color: #111;
    }

    .title {
      text-align: center;
    }

    .ant-form {
      color: #333;
    }
  }

  .btn-back {
    position: absolute;
    left: 10px;
    top: 10px;
  }

  .message-sent-mail {
    margin-bottom: 15px;
  }

  .ant-form-item:last-child {
    margin-bottom: 0;
  }

  .footer-text {
    position: fixed;
    text-align: center;
    width: 100%;
    padding: 0 20px;
    left: 50%;
    bottom: 20px;
    transform: translate(-50%);
    color: #ddd;
    text-shadow: 1px 1px 4px rgb(0 0 0 / 50%);
  }

  .btn-submit-verify-email {
    width: 70px;
  }
`;

const LayoutLogin = (props) => {
  return (
    <LayoutLoginStyled>
      <div className='position-center'>

        <div className='popup-login'>{props.children}</div>
      </div>
    </LayoutLoginStyled>
  );
};

export default LayoutLogin;
