import PropTypes from 'prop-types';
import { Switch } from 'antd';

import Modal from 'components/antdCustom/Modal';

//this component render an antd Switch component but showing confirm on toggle
const SwitchConfirm = (props) => {
  const { onChange, enableConfirm, disableConfirm, ...otherProps } = props;

  const confirmOnChange = (value, event) => {
    if (!onChange) return;
    if (value === true && enableConfirm) {
      const { title, content } = enableConfirm;
      Modal.confirm({ title, content, onOk: () => onChange(value, event) });
    } else if (value === false && disableConfirm) {
      const { title, content } = disableConfirm;
      Modal.confirm({ title, content, onOk: () => onChange(value, event) });
    } else {
      onChange(value, event);
    }
  };
  return <Switch {...otherProps} onChange={confirmOnChange} />;
};

SwitchConfirm.propsType = {
  /**
  confirm on active the switch
   */
  enableConfirm: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),

  /**
  confirm on inactive the switch
   */
  disableConfirm: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default SwitchConfirm;
