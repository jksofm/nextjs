import useSWR from "swr"
import { authApi } from "../api-client"
import { LoginPayload, UserProfile } from "@/models"
import { StorageKeys } from "@/constants"

function getUserInfo():UserProfile | null {
try{
   return JSON.parse(localStorage.getItem(StorageKeys.USER_INFO) || "")
}catch(err){
   console.log(err)
   return null
}
}

export function useAuth(options?:any){

    const { data:profile,error,mutate,isLoading} = useSWR<UserProfile| null>('/profile',{
        dedupingInterval: 60 * 60 *1000,
        revalidateOnFocus : false,
        // fallbackData : getUserInfo(),
        onSuccess(Data:UserProfile){
               localStorage.setItem(StorageKeys.USER_INFO,JSON.stringify(Data))
        },
        onError(err:any){
        console.log(err);
        localStorage.removeItem(StorageKeys.USER_INFO)
        },
        ...options,
      
    })
    const firstLoading  = profile === undefined && error === undefined
  

    async function login(data:LoginPayload){
        await authApi.login(data)
        /// Sử dụng mutate để gọi useSWR lân đầu tiên để get Profile
        await mutate()
    }
    async function logout(){
       await authApi.logout();
       localStorage.removeItem(StorageKeys.USER_INFO)
       /// Mutate để ngay lập tức thay đổi giao diện, còn logout sẽ gọi API để thay đổi
       mutate(null,false)
    }

    return {
        profile,
        error,
        login,
        logout,
        firstLoading,
        isLoading

    }


}