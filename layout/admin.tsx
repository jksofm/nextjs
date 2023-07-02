import AuthLayout from '@/components/common/auth';
import { LayoutProps } from 'models';
import Link from 'next/link';
import * as React from 'react';
import { useAuth } from '../hooks';


export default function AdminLayout (props: LayoutProps) {
    const {logout} = useAuth()
  return (
    <AuthLayout>
      <h1>Admin Layout</h1>
      <div>Sidebar</div>

      <button onClick={()=>{
           logout()
      }}>Logout</button>

<Link passHref legacyBehavior href="/">
  <a>Home</a>
</Link>
<Link passHref legacyBehavior href="/about">
  <a>About</a>
</Link>
<div>
  {props.children}
</div>
    </AuthLayout>
  );
}
