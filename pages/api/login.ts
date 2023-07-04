// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from "http-proxy"
import Cookies from "cookies"
type Data = {
  message: string
}

export const config = {
    api: {
        bodyParser: false,
    }
}
const proxy = httpProxy.createProxyServer()
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("Login")
  if(req.method !== 'POST'){
    return res.status(404).json({
      message: 'method not supported'
    })
  }
 

    return new Promise((resolve)=>{
      req.headers.cookie = ""
      // TỰ handle Response
      const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
        //Lấy token để chueyenr thanh cookie
          let body = ''
          proxyRes.on('data',function(chunk){
            body +=chunk
          })

          proxyRes.on('end',function(){
           
            
            try {
          /// Xu li cookie
          const isSuccess = proxyRes.statusCode && proxyRes.statusCode >= 200 && proxyRes.statusCode <300
          if(!isSuccess){
            (res as NextApiResponse).status(proxyRes.statusCode || 500).json(body)
            return resolve(true)
          }
       

              const { accessToken , expiredAt} = JSON.parse(body)
              const cookies = new Cookies(req,res,{secure : process.env.NODE_ENV !== 'development' }) 
              
              cookies.set('access_token',accessToken,{
                httpOnly: true,
                sameSite: 'lax',
                expires: new Date(expiredAt)
              });

              (res as NextApiResponse).status(200).json({message: 'login successfully '})
            }catch{
              (res as NextApiResponse).status(404).json({message: 'login fail'})
            }
            // resolve(true)

            

          })
      }



  proxy.once('proxyRes',handleLoginResponse)

  /// Truyền tiếp dữ liệu
      proxy.web(req,res,{
        target: "https://js-post-api.herokuapp.com",
        changeOrigin: true,
        selfHandleResponse: true
      })

    


    })
}
