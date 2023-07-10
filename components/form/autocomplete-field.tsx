import React, { ChangeEvent } from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { AutocompleteProps } from '@mui/joy/Autocomplete';
export type AutoCompleteFieldProps<T, K extends FieldValues> = Partial<
  AutocompleteProps<T, boolean, boolean, boolean>
> & {
  name: Path<K>;
  control: Control<K>;

  placeholder?: string;
  options: T[];
  getOptionLabel: (option: T | any) => string;
  label?: string;
  onChange : (selectedOptions: T[])=>void
  
};
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export function AutoCompleteField<T, K extends FieldValues>({
  name,
  onChange: externalOnChange,
  control,
  placeholder,
  label,
  options,
  getOptionLabel,
  isOptionEqualToValue,
  ...rest
  
}: AutoCompleteFieldProps<T, K>) {
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
  ];
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
 
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={options}
      fullWidth
      size="small"
      disableCloseOnSelect
     
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {getOptionLabel(option) || '-'}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ margin: '12px 0' }}
          name={name}
          label={label}
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
        />
      )}
      onChange={(event,value:any) =>{
       externalOnChange(value)
       onChange(value)
      
       
      }}

      onBlur={onBlur}
      value={value}
      ref={ref}
    />
  );
}

/// Flow cach dung của useForm :
// Component cha sẽ truyền vào form initial value, và một cái handleSubmit để xử lí submit.
/// Các form field sẽ nhận name và control từ useForm sau đó sử dụng useController để xử lí . Với mỗi name khác nhau thì Input field sẽ lấy ra control khác nhau và trả về các value khác nhau để render ra UI.
// Mỗi khi có event change thì  ta phải cấp giá trị mới cho Input ở hàm onChange.
/// Ref dùng để cung cấp error cho control.
