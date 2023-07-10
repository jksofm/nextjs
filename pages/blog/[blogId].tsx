import { Seo } from '@/components/common';
import AuthLayout from '@/components/common/auth';
import MainLayout from '@/layout/main';
import { Post } from '@/models';
import { GetBlogFromId, GetBlogListId } from '@/utils/convert-markdown';
import { Box, Container, Stack, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import Script from 'next/script';

export interface PostDetailPageProps {
  post: Post;
}

export default function BlogDetailPage({ post }: PostDetailPageProps) {
  const router = useRouter();
 
  if (!post) return <h1>Khoong co thong tin</h1>;

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
    paths: listId?.map((item: any) => {
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
