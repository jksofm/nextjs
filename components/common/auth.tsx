import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface AuthLayoutProps {
children : any
}

export default function AuthLayout (props: AuthLayoutProps) {
    const router = useRouter()

    const {profile,firstLoading} = useAuth()


    React.useEffect(()=>{
        if(!firstLoading && !profile?.username) {
            router.push('/login')
        }

    },[router,profile,firstLoading])

    if(!profile?.username) return <>Loading...</>
  return (
    <div>
      {props.children}
    </div>
  );
}
