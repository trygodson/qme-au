import { Field } from 'formik';
import PickDate from 'react-datepicker';
import { Placeholder } from 'react-select/animated';
import { InputField, Item, FormGroup, InputCheckBox } from './styles/ForrmInputs';

export const Input = ({ children, ...props }) => {
  return <Item {...props}>{children}</Item>;
};

Input.InputField = ({ children, ...props }) => {
  return <InputField {...props}>{children}</InputField>;
};

Input.FormGroup = ({ children, ...props }) => {
  return <FormGroup {...props}>{children}</FormGroup>;
};
Input.CheckBox = ({ children, ...props }) => {
  return <InputCheckBox {...props}>{children}</InputCheckBox>;
};

export const DatePicker = props => {
  const { name, placeholder, ...rest } = props;
  return (
    <>
      <label htmlFor={name}>{placeholder}</label>
      <Input.InputField name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <PickDate
              id={name}
              {...field}
              {...rest}
              selected={value}
              startDate={new Date()}
              minDate={new Date()}
              onChange={val => setFieldValue(name, val)}
              placeholderText={placeholder}
            />
          );
        }}
      </Input.InputField>
    </>
  );
};
export const TimePicker = props => {
  const { name, placeholder, time, ...rest } = props;
  return (
    <>
      <label htmlFor={name}>{placeholder}</label>
      <Input.InputField name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <PickDate
              id={name}
              {...field}
              {...rest}
              selected={value}
              showTimeSelect
              showTimeSelectOnly
              onChange={val => setFieldValue(name, val)}
              placeholderText={placeholder}
              timeIntervals={30}
              timeCaption={`Time`}
              dateFormat={`h:mm aa`}
            />
          );
        }}
      </Input.InputField>
    </>
  );
};
