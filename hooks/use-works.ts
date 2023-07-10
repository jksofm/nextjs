import useSWR,{SWRConfiguration} from "swr"
import { authApi, worksApi } from "../api-client"
import { LoginPayload, UserProfile } from "@/models"
import { StorageKeys, SwrKeys } from "@/constants"
import { ListParams } from "@/models/api"


export interface UseWorkListProps{
    params: Partial<ListParams>
    options? : SWRConfiguration
}
export function useWorks({params,options}:UseWorkListProps){
//  Ta truyền vào tham số thứ nhất cảu params không phải là một chuỗi bởi vì mỗi lần ta thay đổi params nó sẽ gọi lại swr
    const swrResponse = useSWR([SwrKeys.GET_WORK_LIST,params],()=>worksApi.getAll(params),{
        dedupingInterval: 30 * 1000,
        fallbackData : {
            data:[],
            pagination: {
                _page:1,
                _limit: 10,
                _totalRows: 0
            }
        },
        keepPreviousData: true,
        ...options
    })
   
  

 

    return swrResponse

}