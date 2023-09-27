import * as React from 'react';
import { useForm } from 'react-hook-form';

import { AutoCompleteField, InputField } from '@/components/form';
import { useTags } from '@/hooks';
import { WorkFiltersPayload } from '@/models';
import { Search } from '@mui/icons-material';
import { Box, debounce } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/router';
import * as yub from 'yup';

export interface FiltersWorkProps {
  onSubmit: (payload: WorkFiltersPayload) => void;
  initialfilters?: WorkFiltersPayload;
}

export default function FiltersWork({ onSubmit, initialfilters }: FiltersWorkProps) {
  const router = useRouter();
  const { data } = useTags({});

  //Validation

  ///Xử li password input

  // Xử lí state băng useForm
  const {
    control,
    handleSubmit,

    formState: { isSubmitting },
  } = useForm<WorkFiltersPayload>({
    defaultValues: {
      search: '',
      selectTagList: [],
      ...initialfilters,
    },
    // resolver: yupResolver(schema)
  });
  /// handleSubmit

  const handleFiltersSubmit = async (values: WorkFiltersPayload) => {
    console.log(values);
    if (!values) return;
    values.tagList_like = values.selectTagList?.join('|') || '';
    delete values.selectTagList;

    await onSubmit(values);
  };
  function handleFilterChange() {
    handleSubmit(handleFiltersSubmit)();
  }

  const debounceSearchChange = debounce(handleFilterChange, 350);
  // const debounceSearchChange = debounce(handleSubmit(handleFiltersSubmit),350)

  return (
    <Box
      component="form"
      // onSubmit={handleSubmit(handleFiltersSubmit)}
    >
      <InputField
        placeholder="Search"
        name="search"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          debounceSearchChange();
        }}
      />
      <AutoCompleteField
        name="selectTagList"
        placeholder="Search by tag list"
        options={data?.data || []}
        getOptionLabel={(option) => {
          return option;
        }}
        control={control}
        label="Filtered by category"
        isOptionEqualToValue={(option, value) => option === value}
        onChange={(selectedOptions) => {
          // console.log(selectedOptions)
          debounceSearchChange();
        }}
      />
    </Box>
  );
}
