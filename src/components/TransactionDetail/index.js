import React from 'react';
import { Button } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { formatCurrency } from 'utils';
import TransactionDetailStyled from './styled';

const TransactionDetail = (props) => {
  const { transactionData } = props;
  const { t } = useTranslation();

  return (
    <TransactionDetailStyled>
      <div className='transaction-detail'>
        <div className='flex-item'>
          <div>
            <span>{t('coinDeposit')}</span>
          </div>
          <div>
            <span>RM {formatCurrency(transactionData.amount)}</span>
          </div>
        </div>
        <div className='space'></div>
        <div className='block'>
          <div className='block-row'>
            <span className='color-gray'>{t('status')}</span>
            <span className={`status ${transactionData.status}`}>
              {transactionData.status}
            </span>
          </div>
        </div>
        <div className='space'></div>
        <div className='block'>
          <div className='block-row'>
            <span className='color-gray'>{t('transactionId')}</span>
            <span>{transactionData.id}</span>
          </div>
          <div className='block-row'>
            <span className='color-gray'>{t('clientFullName')}</span>
            <span>{transactionData.client_full_name}</span>
          </div>
          <div className='block-row'>
            <span className='color-gray'>{t('clientPhoneNumber')}</span>
            <span>{transactionData.client_phone}</span>
          </div>
          <div className='block-row'>
            <span className='color-gray'>{t('timeCreated')}</span>
            <span>
              {transactionData.created_at &&
                moment(transactionData.created_at).format('HH:mm - YYYY/MM/DD')}
            </span>
          </div>
          {/* <div className='block-row'>
            <span className='color-gray'>{t('transactionFee')}</span>
            <span>RM 0</span>
          </div> */}
        </div>
        <div
          style={{
            margin: '20vh 0rem',
          }}>
          <Button onClick={props.handleBack} block type='primary' size='large'>
            {t('back')}
          </Button>
        </div>
      </div>
    </TransactionDetailStyled>
  );
};

export default TransactionDetail;
