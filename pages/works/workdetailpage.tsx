import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';

import AuthLayout from '@/components/common/auth';
import { Seo } from '@/components/common';

export default function WorkDetailPage() {
  const router = useRouter();
  const post = {
    id: '1',
    title: 'Making a design system from sratch',
    createdAt: '1648363391671',
    tagList: ['Design', 'Pattern'],
    shortDescription:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    fullDescription:
      '<p>Ametminimmollitnondeseruntullamcoestsitaliquadolordoametsint.Velitofficiaconsequatduisenimvelitmollit.Exercitationveniamconsequatsuntnostrudamet.</p><div><imgsrc="https://res.cloudinary.com/kimwy/image/upload/v1662798475/learn-nextjs/post-img-1_zjggpj.jpg"alt="postimg1"width="100%"/></div><h1>Heading1</h1><h2>Heading2</h2><p>Ametminimmollitnondeseruntullamcoestsitaliquadolordoametsint.Velitofficiaconsequatduisenimvelitmollit.Exercitationveniamconsequatsuntnostrudamet.</p><div><imgsrc="https://res.cloudinary.com/kimwy/image/upload/v1662798475/learn-nextjs/post-img-2_zjggpj.jpg"alt="postimg1"width="100%"/></div><div><imgsrc="https://res.cloudinary.com/kimwy/image/upload/v1662798475/learn-nextjs/post-img-3_zjggpj.jpg"alt="postimg1"width="100%"/></div>',
    updatedAt: '1648363391671',
    thumbnailUrl:
      'https://res.cloudinary.com/dq52ggm0k/image/upload/v1688265129/feature11_idzedr.jpg',
  };

  return (
    <AuthLayout>
      <Box>
        <Seo
          data={{
            title: `${post.title}`,
            description: `${post.shortDescription}`,
            url: `https://nextjs-git-master-jksofm.vercel.app/works/${post.id}`,
            thumbnailUrl: `${post.thumbnailUrl}`,
          }}
        />
        <Container
          sx={{
            padding: '120px 0',
          }}
        >
          <Box>
            <Typography fontWeight="700" variant="h4" component="h1">
              {post.title}
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
                {post.createdAt}
              </Typography>

              <Typography>{post.tagList.join(', ')}</Typography>
            </Stack>
            <Typography mb={2}>{post.shortDescription}</Typography>

            <Typography
              component="div"
              dangerouslySetInnerHTML={{ __html: `${post.fullDescription}` }}
              sx={{
                '& img': { width: '100%', borderRadius: '10px', margin: '20px 0' },
                '& li': {
                  marginLeft: '26px',
                },
                '& h2': {
                  marginBottom: '20px',
                  marginTop: '20px',
                },
              }}
            ></Typography>
          </Box>
        </Container>
        
      </Box>
    </AuthLayout>
  );
}

export async function getStaticProps() {
  console.log('get static props');

  return {
    props: {},
  };
}
