import { Button, notification } from 'antd';
import { uniqueId } from 'lodash';

/**
 * This function extend antd notification
 * @param {object} notificationInput antd notification input {@link https://ant.design/components/notification/ AntDesign}.
 * @param {string} notificationInput.okText text showing on the OK button
 * @param {function} notificationInput.onOK function onClick the OK button
 * Customize: Set default style to warning with button OK doing action
 */
const openNotifyError = ({
  okText = 'OK',
  onOK,
  duration = 10,
  ...others
} = {}) => {
  const key = uniqueId('notifyError');
  const btn = onOK && (
    <Button
      style={{ background: '#ff9500', border: 'none' }}
      type='primary'
      size='small'
      onClick={() => {
        onOK();
        notification.close(key);
      }}>
      {okText}
    </Button>
  );
  notification.error({
    style: { background: '#ffeba8', color: '#7a6b2a' },
    btn,
    key,
    duration,
    ...others,
  });
};

export default openNotifyError;
