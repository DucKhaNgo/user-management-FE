import OtpInput from 'react-otp-input';
import styled from 'styled-components';

const InputOTPStyle = styled.span`
  .custom-otp-input {
    width: 28px !important;
    padding: 4px;
  }
  .separator {
    margin-left: 2px;
    margin-right: 2px;
  }
`;

const InputOTP = (props) => {
  return (
    <InputOTPStyle>
      <OtpInput
        {...props}
        numInputs={6}
        containerStyle={{ display: 'inline-flex' }}
        separator={<span className='separator'>-</span>}
        inputStyle='ant-input custom-otp-input'
      />
    </InputOTPStyle>
  );
};

export default InputOTP;
