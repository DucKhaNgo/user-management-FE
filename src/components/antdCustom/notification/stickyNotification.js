import { notification } from 'antd';
import { uniqueId } from 'lodash';

/**
 * This function extend antd notification
 * checkout document here {@link https://ant.design/components/notification/ AntDesign}.
 * customize: this notification won't auto close.
 * @returns {(notificationInput: object) => function} function to close notification manually
 */
const HOFStickyNotification = (notificationFunction) => {
  return (notificationInput) => {
    const { duration = 0, ...others } = notificationInput;
    const key = uniqueId('stickyNotify');

    notificationFunction({ ...others, duration, key });

    return () => {
      notification.close(key);
    };
  };
};

const objectStickyNotification = {
  success: HOFStickyNotification(notification.success),
  error: HOFStickyNotification(notification.error),
  info: HOFStickyNotification(notification.info),
  warning: HOFStickyNotification(notification.warning),
};
export default objectStickyNotification;
