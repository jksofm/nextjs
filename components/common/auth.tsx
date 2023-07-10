import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import * as React from 'react';
import {Box,Typography,Stack} from "@mui/material"
import { StorageKeys } from '@/constants';
import LinearProgress from '@mui/material/LinearProgress';

export interface AuthLayoutProps {
children : any
}

export default function AuthLayout (props: AuthLayoutProps) {
    const router = useRouter()

    const {profile,firstLoading} = useAuth()


    React.useEffect(()=>{

       const loading = setTimeout(()=>{
        if(!firstLoading && !profile?.username) {
           
          router.push('/login')
      }
       },1500)
       return ()=>{
        clearTimeout(loading)
       }
      

    },[router,profile,firstLoading])
    if (typeof window !== 'undefined') {
     

      // Perform localStorage action
      if(!profile?.username && !localStorage.getItem(StorageKeys.USER_INFO)) {
        return (
        <Box textAlign="center">
         <Typography component="h2" variant='h2' sx={{
           color : "primary.main",
           fontWeight: "700",
           marginTop: "200px"
         
         }}>
           YOU HAVE TO LOGIN
         </Typography>
        </Box>
        )
}
    }
   
  return (
    <div>
      {props.children}
    </div>
  );
}
