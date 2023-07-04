import React from 'react';
import { useController, Control } from 'react-hook-form';
import { Box, TextField, TextFieldProps } from '@mui/material';

export type InputFieldProps = TextFieldProps & {
  name: string;

  control: Control<any>;
};
export function InputField({
  name,
  label,
  control,
  onChange: externalOnChange,
  onBlur: externalOnBlur,
  value: externalValue,
  ref: externalRef,
  ...rest
}: InputFieldProps) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      inputRef={ref}
      {...rest}
      error={!!error}
      helperText={error?.message }
    />
  );
}

/// Flow cach dung của useForm :
// Component cha sẽ truyền vào form initial value, và một cái handleSubmit để xử lí submit.
/// Các form field sẽ nhận name và control từ useForm sau đó sử dụng useController để xử lí . Với mỗi name khác nhau thì Input field sẽ lấy ra control khác nhau và trả về các value khác nhau để render ra UI.
// Mỗi khi có event change thì  ta phải cấp giá trị mới cho Input ở hàm onChange.
/// Ref dùng để cung cấp error cho control.
