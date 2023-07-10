import * as React from 'react';
import { Box } from '@mui/material';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Stack from '@mui/joy/Stack';
import Autocomplete from '@mui/joy/Autocomplete';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
export interface SearchBoxProps {
    searchFilter : Function,
    total : number
}

export default function SearchBox({searchFilter,total}: SearchBoxProps) {
  const top100Films = [
    { title: 'Veritatis placeat', },
    { title: 'Amet praesentium', },
    { title: 'Nihil mollitia', },
    { title: 'Accusamus ab in', },
    { title: 'Quaerat exercitationem', },
  
  ];
  return (
    <React.Fragment>
      <StyledEngineProvider injectFirst>
      <CssVarsProvider>
      <Box>
        <FormControl id="free-solo-2-demo">
       
        <Autocomplete
          placeholder="Search anything"
          type="search"
          freeSolo
          disableClearable
          options={top100Films.map((option) => option.title)}
         
          onInputChange ={(e,value)=>{
            if(value.trim()!==""){
                searchFilter((prev:any)=>{
                    return {
                        ...prev,
                        _limit: total,
                        title_like: value,

                    }
                 })
            }
            if(value.trim()===""){
                searchFilter((prev:any)=>{
                    return {
                        ...prev,
                        _limit: 5,
                        title_like: ""
                    }
                 })
            }
           
          }}
        />
      </FormControl>
    </Box> 
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.Fragment>
  );
}


  

