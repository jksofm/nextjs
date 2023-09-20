import React, { ChangeEvent, useState } from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { Box, FormHelperText, TextField, TextFieldProps, Typography } from '@mui/material';
import Image from 'next/image';
import img from '../../images/work/placehold.jpg';
export type InputFileProps<T extends FieldValues> = {
  name: Path<T>; ///Filted values là một kiễu dữ liệu object chứa key và value, value là kiểu any, key là string
  // Path<T> nghĩ là name sẽ là key của dữ liệu này
  defaultUrl?: string;
  control: Control<T>;
  label?: string;
};
// Khi minh set generic type cho inputfiled la T extend Filedvalues thì mình sẽ chắc chắn được rằng name truyền trong props sẽ là key của thằng field values
export function InputFile<T extends FieldValues>({
  name,
  label,
  control,
  defaultUrl,
}: InputFileProps<T>) {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <Box>
      <Typography
        sx={{
          marginTop: '20px',
        }}
        variant="body2"
      >
        {label}
      </Typography>
      <Box
        sx={{
          cursor: 'pointer',
        }}
        component="label"
        htmlFor="id#"
      >
        <Image
          src={previewUrl || (defaultUrl as string) || img}
          width={238}
          height={200}
          style={{
            objectFit: 'cover',
          }}
          className="w-full h-auto"
          alt="Preview thumnail"
        />
      </Box>

      <FormHelperText error={!!error}> {error?.message}</FormHelperText>
      <Box
        component="input"
        type="file"
        hidden
        id="id#"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file as File);

            setPreviewUrl(url);
            console.log(error?.message);
            onChange({
              file,
              previewUrl: url,
            } as any);
          }
        }}
        accept="image/*"
      />
    </Box>
  );
}

/// Flow cach dung của useForm :
// Component cha sẽ truyền vào form initial value, và một cái handleSubmit để xử lí submit.
/// Các form field sẽ nhận name và control từ useForm sau đó sử dụng useController để xử lí . Với mỗi name khác nhau thì Input field sẽ lấy ra control khác nhau và trả về các value khác nhau để render ra UI.
// Mỗi khi có event change thì  ta phải cấp giá trị mới cho Input ở hàm onChange.
/// Ref dùng để cung cấp error cho control.
