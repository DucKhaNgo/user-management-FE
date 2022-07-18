import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import authAction from 'reduxStore/auth/actions';
import Modal from 'components/antdCustom/Modal';

const PopupLogout = (props) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { onClose = () => {} } = props;
  const onLogOut = () => {
    dispatch(authAction.logout());

    onClose();
  };

  return (
    <Modal
      title={t('logOut.confirmTitle')}
      visible={props.visible}
      onOk={onLogOut}
      onCancel={onClose}>
      <p>{t('logOut.confirmMessage')}</p>
    </Modal>
  );
};
export default PopupLogout;
