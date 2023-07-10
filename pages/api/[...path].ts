// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from "http-proxy"
import Cookies from 'cookies'
// type Data = {
//   name: string
// }

export const config = {
    api: {
        bodyParser: false,
    }
}
const proxy = httpProxy.createProxyServer()
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
 

    return new Promise((resolve)=>{
    //Conver cookies for Authorizzation
   const cookies = new Cookies(req,res)
   const access_token = cookies.get('access_token')
   if(access_token){
  
    req.headers.Authorization = `Bearer ${access_token}`
   }

      req.headers.cookie = ""

      proxy.web(req,res,{
        target: "https://js-post-api.herokuapp.com",
        changeOrigin: true,
        selfHandleResponse: false
      })

    //   proxy.once('proxyRes',()=>{
    //     resolve(true)
    //   })


    })
}
