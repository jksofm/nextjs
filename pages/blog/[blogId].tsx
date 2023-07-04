import { Post } from '@/models';
import { GetBlogFromId, GetBlogListId } from '@/utils/convert-markdown';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Container, Box, Stack, Typography } from '@mui/material';
import MainLayout from '@/layout/main';
import Script from 'next/script';
import { Seo } from '@/components/common';
import AdminLayout from '@/layout/admin';
import AuthLayout from '@/components/common/auth';

export interface PostDetailPageProps {
  post: Post;
}

export default function BlogDetailPage({ post }: PostDetailPageProps) {
  const router = useRouter();
  console.log(post);
  if (!post) return <h1>Khoong co thong tin</h1>;
  console.log(typeof(post.htmlContent))
  return (
    <AuthLayout>
  <Box>
          <Seo data={{
        title:`${post.header}`,
        description:`${post.description}`,
        url: `https://nextjs-git-master-jksofm.vercel.app/blog/${post.slug}`,
        thumbnailUrl: `${post.author?.avatarUrl}`,
      } } />
             <Container
      sx={{
        padding: '120px 0',
      }}
    >
      <Box>
        <Typography fontWeight="700" variant="h4" component="h1">
          {post.header}
        </Typography>

        <Stack mt={3} mb={2} flexDirection="row">
          <Typography
            sx={{
              backgroundColor: 'primary.main',
              padding: '2px 8px',
              borderRadius: '16px',
              color: 'white',
              fontWeight: '700',
            }}
            mr={4}
          >
            {post.created}
          </Typography>

          <Typography>{post.tag}</Typography>
        </Stack>
        <Typography mb={2}>{post.description}</Typography>

        <Typography
          component="div"
          dangerouslySetInnerHTML={{ __html: `${post.htmlContent}` }}
          sx={{
            '& img': { width: '100%', borderRadius: '10px', margin: '20px 0' },
            '& li': {
              marginLeft: "26px"
            },
            '& h2':{
              marginBottom: "20px",
              marginTop :"20px"

            }
          }}
        ></Typography>
      </Box>
    </Container>
    <Script src="/prism.js" strategy='afterInteractive'></Script>
         </Box>
    </AuthLayout>
       
  );
}
BlogDetailPage.Layout = MainLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const listId = await GetBlogListId();

  return {
    paths: listId.map((item: any) => {
      return {
        params: { blogId: item },
      };
    }),
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (
  context: GetStaticPropsContext
) => {
  const blogId = context.params?.blogId;

  if (!blogId) {
    return { notFound: true };
  }

  const data = await GetBlogFromId(blogId);

  return {
    props: {
      post: data,
    },
  };
};
