import * as React from 'react';
import { authApi } from '../api-client';
import { useAuth } from '../hooks';
import { useRouter } from 'next/router';

export default function LoginPage(){
    const {profile,login,logout} = useAuth({
        revalidateOnMount: false
   })
   const router = useRouter()
    const handleLoginClick=async()=>{
        try{
           await login();
           console.log('redirect to dashboard')
           
        }catch(error) {
              console.log("fail to Login",error)
        }
    }
    // const handleGetProfileClick= async()=>{
    //             try{
    //                 await authApi.getProfile()
    //             }catch(error) {
    //                 console.log("fail to Login",error)
    //           }
    // }
    const handleLogoutClick = async()=>{
        try{
            await logout()
        }catch(error) {
            console.log("log out",error)
      }
    }
    console.log(profile)
    return(
        <div>
            <h1>Login Page</h1>
            {profile !== undefined && profile.hasOwnProperty("username")  &&   
            
            <>
             <p>Profile: {JSON.stringify(profile)}</p>
             <button onClick={()=>{
                router.push("/about")
            }}>Go to About Page</button>
            </>
            }
          
             
             
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleLogoutClick}>Logout</button>

           

            {/* <button onClick={handleGetProfileClick}>Get Profile</button> */}

        </div>
    )
}