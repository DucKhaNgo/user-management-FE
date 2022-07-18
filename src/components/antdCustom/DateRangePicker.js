import { useCallback } from 'react';
import { DatePicker } from 'antd';
import get from 'lodash/get';
import moment from 'moment';
const { RangePicker } = DatePicker;

//this component extends from antd DatePicker.RangePicker
//custom the onChange function: set start time to the begin of the day. set the end time to the end of the day.
const DateRangePicker = ({ onChange, picker = 'day', ...otherProps }) => {
  const customOnChange = useCallback(
    (value) => {
      // this function set start tine to the begin of the day, end time to the end of the day.

      let startTime = get(value, '[0]');
      let endTime = get(value, '[1]');
      let newValue = value;

      if (startTime) {
        startTime = moment(startTime);
        startTime.startOf(picker);

        newValue[0] = startTime;
      }

      if (endTime) {
        endTime = moment(endTime);
        endTime.endOf(picker);

        newValue[1] = endTime;
      }

      if (onChange) onChange(newValue);
    },
    [onChange, picker],
  );

  return (
    <RangePicker {...otherProps} picker={picker} onChange={customOnChange} />
  );
};

export default DateRangePicker;
