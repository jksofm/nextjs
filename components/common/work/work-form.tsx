import * as React from 'react';
import { useForm } from 'react-hook-form';

import { AutoCompleteField, InputField } from '@/components/form';
import { useTags } from '@/hooks';
import { WorkFiltersPayload, WorkPayload } from '@/models';
import { Search } from '@mui/icons-material';
import { Box, Button, debounce } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/router';
import * as yub from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputFile } from '@/components/form/input-file';
import { InputEditor } from '@/components/form/input-editor';

export interface WorkFormProps {
  onSubmit: (payload: Partial<WorkPayload>) => void;
  initialValues?: Partial<WorkPayload>;
  isAddMode: boolean;
}

export default function WorkForm({ onSubmit, initialValues, isAddMode }: WorkFormProps) {
  const router = useRouter();
  const { data: dataTagList } = useTags({});
  const schema = yub.object().shape({
    title: yub.string().required('Please enter work title!'),
    shortDescription: yub.string().required('Please enter work description'),
    tagList: yub.array().of(yub.string()).min(1, 'Please select at least 1 tag'),
    thumbnail: yub.object().test((value, ctx) => {
      if (!isAddMode && !!initialValues?.thumbnailUrl && !(value as any).file) {
        return true;
      }
      if (isAddMode && !(value as any).file) {
        return ctx.createError({ message: 'Please choose thumbnail image!' });
      }
      //limit size

      const fileSize = (value as any)?.file?.size || 0;
      console.log(fileSize);
      const maxSize = 3 * 1024 * 1024; // 3MB
      if (fileSize > maxSize) {
        return ctx.createError({ message: 'Please choose image with size below 3MB!' });
      }
      return true;
    }),
  });

  //Validation

  ///Xử li password input

  // Xử lí state băng useForm
  const {
    control,
    handleSubmit,

    formState: { isSubmitting },
  } = useForm<Partial<WorkPayload>>({
    defaultValues: {
      thumbnail: {
        file: null,
        previewUrl: '',
      },
      ...initialValues,
    },
    resolver: yupResolver(schema) as any,
  });
  /// handleSubmit

  const handleFiltersSubmit = async (values: Partial<WorkPayload>) => {
    await onSubmit(values);
  };
  function handleFilterChange() {
    handleSubmit(handleFiltersSubmit)();
  }

  const debounceSearchChange = debounce(handleFilterChange, 350);
  // const debounceSearchChange = debounce(handleSubmit(handleFiltersSubmit),350)

  return (
    <Box
      sx={{
        marginTop: '20px',
      }}
      component="form"
      onSubmit={handleSubmit(handleFiltersSubmit)}
    >
      <InputField placeholder="Title" name="title" control={control} />

      <InputField
        InputProps={{
          multiline: true,
        }}
        placeholder="Short Description"
        name="shortDescription"
        control={control}
      />

      <AutoCompleteField
        name="tagList"
        placeholder="Tag List"
        options={dataTagList.data as string[]}
        getOptionLabel={(option) => {
          return option;
        }}
        control={control}
        label="Filtered by category"
        isOptionEqualToValue={(option, value) => option === value}
        onChange={(selectedOptions) => {
          // console.log(selectedOptions)
          // debounceSearchChange();
        }}
      />
      <InputFile
        defaultUrl={initialValues?.thumbnailUrl}
        name="thumbnail"
        control={control}
        label="Thumbnail image"
      />
      <InputEditor name="fullDescription" control={control} label="Full Description" />

      <Button
        sx={{
          padding: '8px 12px',
          fontSize: '1rem',
          color: 'white',
          background: '#FF7999',
          marginTop: '20px',
          '&:hover': {
            background: '#d4bac0',
            color: 'grey',
          },
        }}
        type="submit"
      >
        Submit
      </Button>
    </Box>
  );
}
