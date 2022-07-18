import styled from 'styled-components';

const ChangePasswordStyled = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .position-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 390px;
    max-width: calc(100vw - 10px);
  }

  .popup-login {
    background: rgba(255, 255, 255, 0.7);

    padding: 30px;
    border-radius: 15px;
    box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.3);

    backdrop-filter: blur(8px);

    .title {
      font-size: 25px;
      color: #333;
      text-align: center;
    }
  }
`;

export default ChangePasswordStyled;
