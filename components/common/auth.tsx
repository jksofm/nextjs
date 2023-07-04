import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import * as React from 'react';
import {Box,Typography} from "@mui/material"

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

    if(!profile?.username) {
               return (
               <Box textAlign="center">
                <Typography component="h2" variant='h2' sx={{
                  color : "primary.main",
                  fontWeight: "700",
                  marginTop: "40%"
                
                }}>
                  YOU HAVE TO LOGIN
                </Typography>
               </Box>
               )
    }
  return (
    <div>
      {props.children}
    </div>
  );
}
