import * as React from 'react';
import useSWR from 'swr'
export interface StudentDetailProps {
    studentId: string
}

export default function StudentDetail ({studentId}: StudentDetailProps) {
   const {data,error,mutate,isValidating} = useSWR(`/students/${studentId}`,{
     dedupingInterval: 2000,// Trong vòng 2 dây , dù bạn có gọi lại useSWR bao nhiêu lần thi nó vẫn sẽ  trả vê cái cũ ngay lập tức với cùng một API
   })

   //Khi ta gọi mutate thì nó ngay lập tức thay đổi dữ liệu data ở phía client nhưng lúc này ở phia server chưa thay đổi, ta có thể thay đổi ở phia server một cách âm thầm để tạo ra user experience tốt hơn
   const handleMutate = ()=>{
    mutate({name: "huy dep trai"},false)
   }
    
  return (
    <div>
      Name:{data?.name||"--"}

      <button onClick={handleMutate}>MUtate</button>
    </div>
  );
}
