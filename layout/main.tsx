import { LayoutProps } from 'models';
import Link from 'next/link';
import * as React from 'react';
import { Stack, Box,Container } from '@mui/material';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
export default function MainLayout(props: LayoutProps) {
  return (
    <Stack minHeight="100vh">
      <Header />


      <Box flexGrow={1} component="main">
        {/* <Container maxWidth="md" sx = {{bgcolor:'primary.main','@media(min-width:900px)': {maxWidth:'860px'}}}>MD Container</Container>
        <Container maxWidth="sm" sx = {{bgcolor:'secondary.main','@media(min-width:600px)': {maxWidth: '680px'}}}>SM Container</Container> */}
       

    
        {props.children}</Box>

      <Footer />
    </Stack>
  );
}
