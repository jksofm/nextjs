import * as React from 'react';
import { Box, Container, Stack, Typography, Button } from '@mui/material';
import Image from 'next/image';
import avatar from '../../images/home/avatar.png';

export default function HeroSection() {
  return (
    <Box component="section" pt={{ md: 18, xs: 4 }} pb={{ md: 9, xs: 7 }}>
      <Container>
        <Stack
          spacing={4}
          textAlign={{ xs: 'center', md: 'left' }}
          alignItems={{ xs: 'center', md: 'flex-start' }}
          justifyContent={{ md: 'space-between' }}
          direction={{ xs: 'column-reverse', md: 'row' }}
        >
          <Box>
            <Typography
              sx={{ fontWeight: 'bold' }}
              mb={{ xs: 3, md: 5 }}
              component="h1"
              variant="h3"
            >
              Hi, I am Huy, <br />
              Creative Technologist
            </Typography>
            <Typography mb={{ xs: 3, md: 5 }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus accusamus labore
              animi mollitia maxime beatae fugit magnam reprehenderit debitis, quaerat consequuntur
              maiores deleniti vero architecto incidunt enim pariatur cupiditate illo!
            </Typography>
            <Button variant="contained" size="large">
              Download Resources
            </Button>
          </Box>
          <Box
            sx={{
              minWidth: '240px',
              boxShadow: '-5px 13px',
              color: 'secondary.light',
              borderRadius: '50%',
            }}
          >
            <Image alt="Avatar" src={avatar} layout="responsive" />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
