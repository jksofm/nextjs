import useSWR from "swr"
import { authApi } from "../api-client"


export function useAuth(options?:any){

    const { data:profile,error,mutate} = useSWR('/profile',{
        dedupingInterval: 60 * 60 *1000,
        revalidateOnFocus : false,
        ...options
    })
    const firstLoading  = profile === undefined && error === undefined
  

    async function login(){
        await authApi.login({
            username: 'test',
            password:  '123456'
        })
        /// Sử dụng mutate để gọi useSWR lân đầu tiên để get Profile
        await mutate()
    }
    async function logout(){
       await authApi.logout()
       /// Mutate để ngay lập tức thay đổi giao diện, còn logout sẽ gọi API để thay đổi
       mutate({},false)
    }

    return {
        profile,
        error,
        login,
        logout,
        firstLoading

    }


}