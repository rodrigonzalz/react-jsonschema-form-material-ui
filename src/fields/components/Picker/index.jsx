/* eslint-disable max-len */
import React from 'react';
import TextField from '@material-ui/core/TextField';

// Modal
import DateRangePicker from '@material-ui/lab/MobileDateRangePicker';
import TimePicker from '@material-ui/lab/MobileTimePicker';
import DateTimePicker from '@material-ui/lab/MobileDateTimePicker';
import DatePicker from '@material-ui/lab/MobileDatePicker';

// Keyboard
import KeyboardDateRangePicker from '@material-ui/lab/DateRangePicker';
import KeyboardTimePicker from '@material-ui/lab/TimePicker';
import KeyboardDateTimePicker from '@material-ui/lab/DateTimePicker';
import KeyboardDatePicker from '@material-ui/lab/DatePicker';

// Internal
import pickerProps from './picker.props';

const renderPickerComp = (type) => {
  switch (type) {
    case 'material-date':
      return {
        PickerComp: KeyboardDatePicker,
        maskInput: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        format: 'DD-MM-YYYY',
        placeholder: '__-__-____',
      };
    case 'material-date-range-keyboard':
      return {
        PickerComp: KeyboardDateRangePicker,
        maskInput: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        format: 'DD-MM-YYYY',
        placeholder: '__-__-____',
      };  
    case 'material-date-range':
      return {
        PickerComp: DateRangePicker,
        maskInput: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        format: 'DD-MM-YYYY',
        placeholder: '__-__-____',
      };
    case 'material-date-keyboard-disable':
      return {
        PickerComp: DatePicker,
        maskInput: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        format: 'DD-MM-YYYY',
        placeholder: '__-__-____',
      };
    case 'material-time-keyboard-disable':
      return {
        PickerComp: TimePicker,
        maskInput: [/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M'],
        format: 'hh:mm A',
        placeholder: '__:__ __',
      };
    case 'material-time':
      return {
        PickerComp: KeyboardTimePicker,
        maskInput: [/\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M'],
        format: 'hh:mm A',
        placeholder: '__:__ __',
      };
    case 'material-datetime':
      return {
        PickerComp: KeyboardDateTimePicker,
        maskInput: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M'],
        format: 'DD-MM-YYYY hh:mm A',
        placeholder: '__-__-___ __:__ __',
      }; 
    case 'material-datetime-keyboard-disable':
      return {
        PickerComp: DateTimePicker,
        maskInput: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ' ', /a|p/i, 'M'],
        format: 'DD-MM-YYYY hh:mm A',
        placeholder: '__-__-___ __:__ __',
      };
    default:
      return {
        PickerComp: KeyboardDatePicker,
        maskInput: [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        format: 'DD-MM-YYYY',
        placeholder: '__-__-____',
      };
  }
};

export default ({ path, label, title, value, options = {}, htmlid, type, uiSchema = {}, onChange, ...rest }) => {
  const pickerType = uiSchema['ui:props']?.variant || uiSchema['ui:widget'] || type;
  const { PickerComp, maskInput, placeholder, format } = renderPickerComp(pickerType);
  return (
        <div
          id={htmlid}
          key={`material-date-picker-${label}`}
          className='material-form-datepicker'
          style={{ 
            'display': 'contents',
            '&>div': {
              flexBasis: '100%',
            },
          }}
        >
            <PickerComp
                format={format}
                style={{ flexBasis: '100%' }}
                placeholder={placeholder}
                label={label}
                value={(value === undefined) ? null : value}
                maxDate={'2200-01-01'}
                animateYearScrolling={false}
                renderInput={(params) => <TextField {...params} />}
                {...pickerProps({ onChange })}
                {...options}
            />
        </div>
  );
};
