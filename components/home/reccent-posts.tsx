import * as React from 'react';
import { Box, Container, Stack, Typography, Button, Grid ,Link as MuiLink} from '@mui/material';
import SinglePost from '../common/singlepost';
import Link from 'next/link';

export interface RecentPostsProps {}

export default function RecentPosts(props: RecentPostsProps) {
  const dataPosts = [
    {
      id: 1,
      header: 'Making a design system from sratch',
      created: '12 Fed 2020',
      tag: 'Desgin, Pattern',
      content:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
    {
      id: 2,
      header: 'Creating pixel perfect icons in Figma',
      created: '12 Fed 2020',
      tag: 'Figma, Icon Design',
      content:
        'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    },
  ];
  return (
    <Box
      sx={{
        backgroundColor: 'secondary.light',
        paddingBottom: '32px',
      }}
    >
      <Container>
        <Stack>
          <Box>
            <Stack justifyContent={{md:"space-between",xs:"center"}} flexDirection="row">
              <Typography
                sx={{
                  color: '#21243D',
                  lineHeight: '60px',
                  fontWeight: '400',
                }}
                fontSize={{
                  xs: '1.2rem',
                  md: '1.4rem',
                }}
               
              >
                Recent posts
              </Typography>
              <MuiLink display={{
                  xs: 'none',
                  md: 'block',
                }}
                sx={{
                  color: '#00A8CC',
                  margin: 'auto 0',
                }}  component={Link} passHref href="/blog">
              View all
              </MuiLink>
             
            </Stack>
          </Box>
          <Box>
            <Grid container spacing={2}>
              {dataPosts.map((post) => {
                return (
                  <Grid key={post.id} item xs={12} md={6}>
                    <SinglePost
                      header={post.header}
                      tag={post.tag}
                      content={post.content}
                      created={post.created}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
