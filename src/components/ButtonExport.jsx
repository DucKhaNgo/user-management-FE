import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import styled from 'styled-components';

const ButtonExportStyled = styled.div`
  button {
    color: white;
    background: #009688;
    border-color: #009688;

    &:hover,
    :focus {
      color: white;
      background: #26aea1;
    }
  }

  .sub-btn {
    color: white;
    background: #009688;
    border-color: #009688;

    &:hover {
      color: white;
      background: #26aea1;
    }
  }
`;

const ButtonExport = ({
  children,
  onExportCSV,
  onExportExcel,
  ...otherProps
}) => {
  return (
    <ButtonExportStyled>
      <Dropdown
        trigger='click'
        overlay={
          <Menu style={{ background: '#f5fffe' }}>
            <Menu.Item className='sub-btn' onClick={onExportCSV}>
              CSV file {'(.csv)'}
            </Menu.Item>
            <Menu.Item className='sub-btn' onClick={onExportExcel}>
              Excel file {'(.xlsx)'}
            </Menu.Item>
          </Menu>
        }
        {...otherProps}>
        <Button>{children}</Button>
      </Dropdown>
    </ButtonExportStyled>
  );
};

export default ButtonExport;
