import { worksApi } from '@/api-client';
import { Seo } from '@/components/common';
import AuthLayout from '@/components/common/auth';
import PaginationComponent from '@/components/common/work/pagination';
import SkeletonWorkList from '@/components/common/work/skeleton-work-list';
import FiltersWork from '@/components/common/work/work-filters';
import WorkForm from '@/components/common/work/work-form';
import WorkList from '@/components/common/work/work-list';
import { SwrKeys } from '@/constants';
import { useWorks } from '@/hooks';
import { useWorkDetail } from '@/hooks/use-work-detail';
import MainLayout from '@/layout/main';
import { Work, WorkFiltersPayload, WorkPayload } from '@/models';
import { ListParams } from '@/models/api';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';
import * as React from 'react';
import { toast } from 'react-toastify';
import { Arguments, useSWRConfig } from 'swr';

export interface AddEditWorkPageProps {}

export default function AddEditWorkPage(props: AddEditWorkPageProps) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const isAddMode = router.query.workId === 'add';

  const { data, isLoading, updateWork } = useWorkDetail({
    workId: router.query.workId as string,
    enabled: !isAddMode && Boolean(router.query.workId),
  });
  const handleFormData = (values: Partial<WorkPayload>) => {
    const payload = new FormData();
    if (!isAddMode) {
      payload.set('id', values.id as string);
    }
    if (values.thumbnail?.file) {
      payload.set('thumbnail', values.thumbnail.file);
    }
    values.tagList?.forEach((tag) => {
      payload.append('tagList', tag);
    });
    payload.set('fullDescription', values.fullDescription as string);
    payload.set('shortDescription', values.shortDescription as string);
    payload.set('title', values.title as string);
    payload.forEach((value, key) => {
      console.log(key, value);
    });
    return payload;
  };
  const handleEdit = async (values: Partial<WorkPayload>) => {
    console.log(values);
    if (!values) return null;
    const payload = handleFormData(values);
    try {
      const response = await updateWork(payload);
      setIsEdit(false);

      toast.success('Update work successfully!');
    } catch (error: any) {
      toast.error(`Update work fail! Error: ${error.error} `);

      console.log(error);
    }
  };
  const handleAdd = async (values: Partial<WorkPayload>) => {
    console.log(values);
    if (!values) return null;
    const payload = handleFormData(values);

    try {
      const response = await worksApi.add(payload);
      mutate(
        (key: Arguments) => Array.isArray(key) && key.includes(SwrKeys.GET_WORK_DETAIL),
        undefined,
        {
          revalidate: true,
        }
      );
      // router.push(`/works/${response.id}`);
      router.push(`/works`);

      toast.success('Add work successfully!');
    } catch (error) {
      console.log(error);
      toast.success('Add work fail!');
    }
  };
  return (
    <AuthLayout>
      <Box>
        <Seo
          data={{
            title: `Hello!This is ${data ? data?.title : 'Add'} Work!`,
            description: 'Just call me. 093540****',
            url: `https://nextjs-git-master-jksofm.vercel.app/works/${
              isAddMode ? data?.id : 'add'
            }`,
            thumbnailUrl:
              'https://res.cloudinary.com/dq52ggm0k/image/upload/v1688264648/cld-sample-4.jpg',
          }}
        />
        {!isEdit && isAddMode && (
          <Container sx={{ paddingTop: '100px', paddingBottom: '100px' }}>
            {isAddMode && (
              <Typography component="h1" variant="h3" fontWeight="bold">
                {'Add Work'}
              </Typography>
            )}
            {!isAddMode && Boolean(router.query.workId) && data?.title && (
              <Typography component="h1" variant="h3" fontWeight="bold">
                {`Edit Work: ${data?.title}`}
              </Typography>
            )}

            {router.isReady && isAddMode && (
              <WorkForm
                onSubmit={handleAdd}
                isAddMode={isAddMode}
                initialValues={{
                  fullDescription: '',
                  shortDescription: '',
                  thumbnailUrl: '',
                  tagList: [],
                  title: '',
                }}
              />
            )}
            {router.isReady && !isAddMode && data && (
              <WorkForm isAddMode={isAddMode} onSubmit={handleEdit} initialValues={data} />
            )}
          </Container>
        )}
        {isEdit ? (
          <Container sx={{ paddingTop: '100px', paddingBottom: '100px' }}>
            {isAddMode && (
              <Typography component="h1" variant="h3" fontWeight="bold">
                {'Add Work'}
              </Typography>
            )}
            {!isAddMode && Boolean(router.query.workId) && data?.title && (
              <Typography component="h1" variant="h3" fontWeight="bold">
                {`Edit Work: ${data?.title}`}
              </Typography>
            )}

            {router.isReady && isAddMode && (
              <WorkForm
                onSubmit={handleAdd}
                isAddMode={isAddMode}
                initialValues={{
                  fullDescription: '',
                  shortDescription: '',
                  thumbnailUrl: '',
                  tagList: [],
                  title: '',
                }}
              />
            )}
            {router.isReady && !isAddMode && data && (
              <WorkForm isAddMode={isAddMode} onSubmit={handleEdit} initialValues={data} />
            )}
          </Container>
        ) : (
          <Container sx={{ paddingTop: '100px', paddingBottom: '100px' }}>
            <Typography component="h1" variant="h3" fontWeight="bold">
              {data?.title}
            </Typography>

            <Typography>{data?.shortDescription}</Typography>
            <Box
              sx={{
                marginTop: '35px',
              }}
              component="div"
              dangerouslySetInnerHTML={{ __html: data?.fullDescription as string }}
            />
            {!isAddMode && data && (
              <Button
                sx={{
                  padding: '8px 12px',
                  fontSize: '1rem',
                  color: 'white',
                  background: '#FF7999',
                  marginTop: '20px',
                  '&:hover': {
                    background: '#d4bac0',
                    color: 'grey',
                  },
                }}
                type="button"
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                Edit
              </Button>
            )}
          </Container>
        )}

        <Script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          strategy="afterInteractive"
        />
      </Box>
    </AuthLayout>
  );
}
AddEditWorkPage.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],

    fallback: false,
  };
};
export async function getStaticProps() {
  console.log('get static props');

  return {
    props: {},
  };
}
