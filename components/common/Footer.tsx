import * as React from 'react';
import {Box, Container,Grid,Stack,Link as MuiLink,Typography} from "@mui/material"
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export interface FooterProps {
}

export default function Footer (props: FooterProps) {
  return (
    <Container>

    <Box component="footer" py={7} textAlign="center">
      <Stack  flexDirection="row" alignItems="center"  justifyContent="center"  >
      
          <MuiLink target='_blank' rel='noopener noreferrer' sx={{
            margin: "0 12px"
          }}   component={Link} passHref href="https://www.google.com/">
            <FacebookIcon fontSize="large" />
          </MuiLink>

        
        
          <MuiLink target='_blank' rel='noopener noreferrer'  sx={{
            margin: "0 12px"
          }}  component={Link} passHref href="https://www.google.com/">
            <InstagramIcon fontSize="large" />
          </MuiLink>
          
       
       
          <MuiLink target='_blank' rel='noopener noreferrer'  sx={{
            margin: "0 12px"
          }}  component={Link} passHref href="https://www.google.com/">
            <TwitterIcon fontSize="large" />
          </MuiLink>
          
        
        
          <MuiLink target='_blank' rel='noopener noreferrer'  sx={{
            margin: "0 12px"
          }}  component={Link} passHref href="https://www.google.com/">
            <LinkedInIcon fontSize="large" />
          </MuiLink>
          
        
      </Stack>

      <Typography sx={{fontSize: "14px"}} marginTop={2}>
      Copyright ©{new Date().getFullYear()} All rights reserved 
      </Typography>
    </Box>
    </Container>
  );
}
