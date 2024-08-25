import React from 'react'
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const DateSelector = (props) => {
  const disabledDate = (current) => {
    return current < dayjs().startOf('day');
  };
  return (
    <>
      <RangePicker disabledDate={disabledDate} format='DD-MMM-YYYY' onCalendarChange={props.handleFilterByDate} className='shadow'/>
    </>
  )
}

export default DateSelector
