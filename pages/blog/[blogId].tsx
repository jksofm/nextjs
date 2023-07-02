import { Post } from '@/models';
import { GetBlogFromId, GetBlogListId } from '@/utils/convert-markdown';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Container, Box, Stack, Typography } from '@mui/material';
import MainLayout from '@/layout/main';

export interface PostDetailPageProps {
  post: Post;
}

export default function BlogDetailPage({ post }: PostDetailPageProps) {
  const router = useRouter();
  console.log(post);
  if (!post) return <h1>Khoong co thong tin</h1>;
  console.log(typeof(post.htmlContent))
  return (
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
          }}
        ></Typography>
      </Box>
    </Container>
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
