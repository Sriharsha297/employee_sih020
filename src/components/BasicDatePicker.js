import React, { Fragment, useState } from "react";
import { DatePicker } from "@material-ui/pickers";

function BasicDatePicker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const {handleDateSelect} = props;
  return (
    <Fragment>
      <DatePicker
        autoOk
        label="Pick Date"
        clearable
        animateYearScrolling
        disablePast
        value={selectedDate}
        onChange={val =>{
          handleDateSelect(val);
          handleDateChange(val);
        }}
      />
    </Fragment>
  );
}

export default BasicDatePicker;
