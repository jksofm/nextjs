import { SwrKeys } from "@/constants"
import { ListParams } from "@/models/api"
import useSWR, { SWRConfiguration } from "swr"
import { tagsApi } from "../api-client"


export interface UseTagListProps{
    params?: Partial<ListParams>
    options? : SWRConfiguration
}
export function useTags({params={_page:1,_limit: 30},options}:UseTagListProps){
//  Ta truyền vào tham số thứ nhất cảu params không phải là một chuỗi bởi vì mỗi lần ta thay đổi params nó sẽ gọi lại swr
    const swrResponse = useSWR([SwrKeys.GET_TAG_LIST,params],()=>tagsApi.getAll(params),{
        dedupingInterval: 60 * 1000,
        fallbackData : {
            data:[],
            pagination: {
                _page:1,
                _limit: 30,
                _totalRows: 0
            }
        },
        keepPreviousData: true,
        ...options
    })
   
  

 

    return swrResponse

}