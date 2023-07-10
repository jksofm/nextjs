import MainLayout from '@/layout/main';
import Link from 'next/link';
import * as React from 'react';
import { NextPageWithLayout } from '../models';
import AdminLayout from '@/layout/admin';
import {Box,Typography} from '@mui/material'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
export interface AboutPageProps {}

export default function About(props: AboutPageProps) {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },]
  return (
    <Box>
     
      <Typography component="h1" variant="h3" color="primary.main">About Page</Typography>
      <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={top100Films}
  sx={{ width: 300 }}
  onChange={(e,value)=>{
      
  }}
  renderInput={(params) => {
    // console.log(params)
    return(
      <TextField {...params} label="Movie" />
    )
  }}
/>
      <Link passHref legacyBehavior href="/">
        <a>Back home</a>
      </Link>
    </Box>
  );
}
About.Layout = AdminLayout;
