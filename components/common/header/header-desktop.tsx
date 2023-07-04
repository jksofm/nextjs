import * as React from 'react';
import {Box,Link as MUIlink,Container,Stack,Button} from "@mui/material"

import { ROUTE_LIST } from './routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from "clsx"
import { useAuth } from '@/hooks';
import { StorageKeys } from '@/constants';
export interface HeaderDesktopProps {
}

export default function HeaderDesktop (props: HeaderDesktopProps) {
  const { profile, login, logout,isLoading } = useAuth({
    revalidateOnMount: true,
  });
    const router = useRouter()
  
   

    const handleLogoutClick = async () => {
      try {
        await logout();
        router.push("/login")
      } catch (error) {
        console.log('log out', error);
      }
    };
   
  return (
    <Box display={{lg:'block',xs:"none"}} component="header" py={2} textAlign="center">
      
    <Container>
      <Stack direction="row" justifyContent="flex-end" alignItems="center">
      {ROUTE_LIST.map((route) => (
          <React.Fragment key={route.path}>
            <MUIlink sx={{ml:2,fontWeight:"Medium"}} className={clsx({active : router.pathname === route.path})} component={Link} href={route.path} passHref>
              {route.label}
            </MUIlink>
          </React.Fragment>
        ))}
        {profile !== undefined && profile?.hasOwnProperty('username') ?
           (
          
            <Button sx={{ marginLeft: '2rem' }} variant="contained" onClick={handleLogoutClick}>
              Logout
            </Button>
        
           ): (
            <>
             <Button sx={{ marginLeft: '2rem' }} variant="contained" onClick={()=>{
              router.push("/login")
            }}>
              Go to Login Page
            </Button>
            </>
           )

           }

           
       
      </Stack>
     
    </Container>
  </Box>
  );
}
