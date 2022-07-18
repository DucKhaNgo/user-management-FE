import styled from 'styled-components';

const LayoutStyled = styled.div`
  min-height: 100vh;

  .ant-sider {
    position: fixed;
    height: 100vh;

    + .site-layout {
      margin-left: 200px;
    }

    &.ant-layout-sider-below {
      //this css show up on small screen //when the sider collapsible
      position: relative;

      + .site-layout {
        margin-left: 0;
      }
    }
  }

  .site-layout {
    padding-bottom: 40px;
    position: relative;
  }

  .menu-fixed-bottom {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .logo {
    max-width: 100%;
    width: 95px;
    margin: 10px 0;
    margin-left: 15px;
  }

  .site-layout {
    position: relative;
    padding-bottom: 40px;
  }

  .footer-text {
    position: absolute;
    bottom: 0;
    width: 100%;

    text-align: center;
    color: #b9b9b9;
    padding-top: 5px;
    line-height: 30px;
    font-size: 10px;
  }
`;

export default LayoutStyled;
