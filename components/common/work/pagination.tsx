import * as React from 'react';
import {Pagination as PaginationMui,Box} from '@mui/material';
import Stack from '@mui/material/Stack';
import { Pagination } from '@/models/api';
import { useRouter } from 'next/router';

interface PaginationProps {
    total : number | undefined,
    
    limit? : number,
    setPage : Function

}
export default function PaginationComponent ({total,setPage,limit}: PaginationProps) {
  const router = useRouter()
  const [pagedefault, setPageDefault] = React.useState(1);
    let numberPage
    if(total !== undefined && limit !== undefined){
        numberPage = Math.round(total/limit)
    }
    React.useEffect(()=>{
        setPageDefault(Number(router.query._page))
    },[router.query._page])
    
    

 
    
  return (
    <Box>
 <Stack margin="0 auto" spacing={4}>
   
    <PaginationMui page={pagedefault || 1} variant="outlined" shape="rounded" onChange={(e,value)=>{
        setPage(value)
    }} count={numberPage} color="primary" />
   
  </Stack>
    </Box>
    
  );
}
