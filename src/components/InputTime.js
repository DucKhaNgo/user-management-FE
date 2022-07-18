import { useMemo, useCallback } from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';

import { workingTimeFormat } from 'variables';

/**
 *
 * @param {object} props
 * @param {function} props.onChange (ISODateString) => any
 */
const InputTime = (props) => {
  const { value, onChange, ...other } = props;

  const formattedValue = useMemo(() => moment(value), [value]);
  const customOnchange = useCallback(
    (value) => onChange(value && value.toISOString()),
    [onChange],
  );
  return (
    <TimePicker
      value={formattedValue}
      onChange={customOnchange}
      format={workingTimeFormat}
      allowClear={false}
      {...other}
    />
  );
};

export default InputTime;
