import { Modal } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const CustomModal = (props) => {
  const { okText = <CheckOutlined />, cancelText = <CloseOutlined /> } = props;
  return <Modal {...props} okText={okText} cancelText={cancelText} />;
};

//overwrite method
const HOFOverWriteMethod = (methodInput) => {
  return (props) => {
    const {
      okText = <CheckOutlined />,
      cancelText = <CloseOutlined />,
    } = props;

    methodInput({
      ...props,
      okText,
      cancelText,
    });
  };
};

CustomModal.info = HOFOverWriteMethod(Modal.info);
CustomModal.confirm = HOFOverWriteMethod(Modal.confirm);
CustomModal.success = HOFOverWriteMethod(Modal.success);
CustomModal.error = HOFOverWriteMethod(Modal.error);
CustomModal.warning = HOFOverWriteMethod(Modal.warning);

export default CustomModal;
