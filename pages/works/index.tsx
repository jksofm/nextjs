import { Seo } from '@/components/common';
import AuthLayout from '@/components/common/auth';
import PaginationComponent from '@/components/common/work/pagination';
import SkeletonWorkList from '@/components/common/work/skeleton-work-list';
import FiltersWork from '@/components/common/work/work-filters';
import WorkList from '@/components/common/work/work-list';
import { useWorks } from '@/hooks';
import MainLayout from '@/layout/main';
import { WorkFiltersPayload } from '@/models';
import { ListParams } from '@/models/api';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
  const [routerReady, setRouterReady] = React.useState(false);

  const router = useRouter();
  const filters: Partial<ListParams> = {
    _page: 1,
    _limit: 3,
    ...router.query,
  };

  const { data, isLoading } = useWorks({ params: filters });
  const handlePagination = (value: number) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...filters,

          _page: value,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  const handleFiltersWork = (values: WorkFiltersPayload) => {
    if (values.search?.trim() !== '') {
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...filters,
            title_like: values.search,
            _page: 1,

            tagList_like: values.tagList_like,
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
            _page: 1,
            _limit: 3,
            tagList_like: values.tagList_like,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  };
  React.useEffect(() => {
    if (router.isReady) {
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
          <Stack mb={4} justifyContent="space-between" flexDirection="row" alignItems="center">
            <Typography variant="h4" fontWeight="700" component="h1">
              Works
            </Typography>
            <Button
              sx={{
                fontSize: '1.2rem',
              }}
            >
              <Link href="/works/add">Add Work</Link>
            </Button>
          </Stack>

          <Stack
            flexDirection={{
              xs: 'column',
              sm: 'row',
            }}
            justifyContent={{
              sm: 'space-between',
            }}
            alignItems={{
              sm: 'center',
            }}
            spacing={{
              xs: 2,
              md: 0,
            }}
            mb={2}
          >
            <PaginationComponent
              setPage={handlePagination}
              limit={filters?._limit}
              total={data?.pagination?._totalRows}
            />

            {/* <SearchBox total={data?.pagination._totalRows} searchFilter = {setFilters} /> */}
          </Stack>
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
            {routerReady && (
              <FiltersWork
                onSubmit={handleFiltersWork}
                initialfilters={{
                  search: filters.title_like || '',
                  tagList_like: filters.tagList_like || '',
                  selectTagList: filters.tagList_like?.split('|'),
                }}
              />
            )}
          </Box>

          {isLoading ? (
            <SkeletonWorkList />
          ) : (
            <>
              <Stack>
                <WorkList workList={data?.data} />
              </Stack>
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
