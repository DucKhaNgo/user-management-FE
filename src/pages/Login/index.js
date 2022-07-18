import { useState } from 'react';

import FormLogin from './FormLogin';
import FormVerify from './FormVerify';
import LayoutLogin from 'components/LayoutLogin';

const PageLogin = (props) => {
  const [step, setStep] = useState(1);
  const [currentAccount, setCurrentAccount] = useState();

  const onLoginSuccess = (value) => {
    setCurrentAccount(value);
    setStep(2);
  };

  const formVerifyGoBack = () => {
    setCurrentAccount(undefined);
    setStep(1);
  };
  return (
    <LayoutLogin>
      {step === 1 && <FormLogin onLoginSuccess={onLoginSuccess} />}
      {step === 2 && (
        <FormVerify
          onGoBack={formVerifyGoBack}
          currentAccount={currentAccount}
        />
      )}
    </LayoutLogin>
  );
};

export default PageLogin;
