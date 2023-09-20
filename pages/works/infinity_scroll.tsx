import { Seo } from '@/components/common';
import AuthLayout from '@/components/common/auth';
import PaginationComponent from '@/components/common/work/pagination';
import SkeletonWorkList from '@/components/common/work/skeleton-work-list';
import FiltersWork from '@/components/common/work/work-filters';
import WorkList from '@/components/common/work/work-list';
import { useWorks } from '@/hooks';
import { useWorkInfinitys } from '@/hooks/use-work-list-infinity';
import MainLayout from '@/layout/main';
import { Work, WorkFiltersPayload } from '@/models';
import { ListParams, ListResponse } from '@/models/api';
import { Box, Container, Stack, Typography,Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import * as React from 'react';
import {useInView} from 'react-intersection-observer'

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
  const [routerReady, setRouterReady] = React.useState(false);

  const router = useRouter();
  const filters: Partial<ListParams> = {
   
    ...router.query,
  };

  const { data, isLoading,isValidating,size,setSize } = useWorkInfinitys({ params: filters });
  // console.log({data,size});
  const workList:Array<Work> = data?.reduce((result:Array<Work>,currentPage : ListResponse<Work>)=>{
     result.push(...currentPage.data)
    return result
  },[]) || []
  const pagination  = data?.[0].pagination

  const totalPage = Math.ceil((pagination?._totalRows as number)/(pagination?._limit as number))

  const {ref} = useInView({
    onChange(inView,entry){
      if(inView === true){
        setSize((x)=>x+1)

      }
      
    }

  })

  


  



  const handleFiltersWork = (values: WorkFiltersPayload) => {
    if (values.search?.trim() !== '') {
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...filters,
            title_like: values.search,
            
          
            tagList_like: values.tagList_like

          },
        },
        undefined,
        { shallow: true }
      );
    }
    if (values.search?.trim() === '') {
      router.push(
        {
          pathname: router.pathname,
          query: {
         
            
            tagList_like: values.tagList_like
           
          },
        },
        undefined,
        { shallow: true }
      );
    }
   
  };
  React.useEffect(() => {
    if(router.isReady){
      setRouterReady(true);

    }
         
  }, [router.isReady]);

  return (
    <AuthLayout>
      <Box>
        <Seo
          data={{
            title: 'Hello!This is Work Page!',
            description: 'Just call me. 093540****',
            url: 'https://nextjs-git-master-jksofm.vercel.app/works',
            thumbnailUrl:
              'https://res.cloudinary.com/dq52ggm0k/image/upload/v1688264648/cld-sample-4.jpg',
          }}
        />
        <Container sx={{ paddingTop: '100px', paddingBottom: '100px' }}>
          <Typography variant="h4" fontWeight="700" marginBottom="40px" component="h1">
            Works
          </Typography>


          <Box
            mb={4}
            maxWidth={{
              xs: '100%',
              md: '50%',
            }}
          >
            {/* {router.isReady &&  <FiltersWork
              onSubmit={handleFiltersWork}
              initialfilters={{
                search: filters.title_like || ""  ,
                tagList_search : "",
                selectTagList : []
              }}
            /> } */}
            {routerReady && <FiltersWork
                onSubmit={handleFiltersWork}
                initialfilters={{
                  search: filters.title_like || '',
                  tagList_like: filters.tagList_like || "",
                  selectTagList: filters.tagList_like?.split("|"),
                }}
              />}
            
              
           
          </Box>

          {isLoading ? (
            <SkeletonWorkList />
          ) : (
            <>
              <Stack>
                <WorkList  workList={workList} />


              </Stack>

             {(size < totalPage) && (
               <Button disabled={isValidating} ref={ref} sx={{
                marginTop: 3
              }} variant='contained' onClick={()=>setSize((x)=>x+1)}>
                Load more {workList.length > 0 && isValidating && <CircularProgress sx={{
                  // color : 'black',
                  marginLeft: '6px'
                }}  size={24}/>}
              </Button>
             )}
            </>
          )}
        </Container>
      </Box>
    </AuthLayout>
  );
}
WorksPage.Layout = MainLayout;

export async function getStaticProps() {
  console.log('get static props');

  return {
    props: {},
  };
}
