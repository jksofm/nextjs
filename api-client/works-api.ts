import { ListParams, ListResponse } from "@/models/api";
import { Work } from "../models";
import axiosClient from "./axios-client";

export const worksApi = {
    // Sử dụng partial khi bạn chỉ mún truyên một trong những property trong interface đó
    getAll(params : Partial<ListParams>):Promise <ListResponse<Work>>{
        return axiosClient.get("/works",{params})

    }
    ,
    get(id:string){
        return axiosClient.get(`/works/${id}`)
    },
   
}