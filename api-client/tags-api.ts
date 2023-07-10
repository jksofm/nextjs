import { ListParams, ListResponse } from "@/models/api";
import axiosClient from "./axios-client";

export const tagsApi = {
    // Sử dụng partial khi bạn chỉ mún truyên một trong những property trong interface đó
    getAll(params : Partial<ListParams>):Promise <ListResponse<string>>{
        return axiosClient.get("/tags",{params})

    }
   
   
}