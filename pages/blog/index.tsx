import MainLayout from '@/layout/main';
import { Post } from '@/models';
import { GetBlogListFromMarkDown } from '@/utils/convert-markdown';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import {Box,Container,Typography,Divider,Link as MuiLink} from "@mui/material"
import * as React from 'react';
import SinglePost from '@/components/common/singlepost';
import { Seo } from '@/components/common';

export interface BlogListPageProps {
    blogs : Post[]
}

export default function BlogListPage ({
blogs
}: BlogListPageProps) {
  console.log(blogs)
  return (
    <Box>
        <Seo data={{
        title:"Hello!This is Blog Page!" ,
        description:"Just call me. 093540****",
        url: "https://nextjs-git-master-jksofm.vercel.app/blog",
        thumbnailUrl: "https://res.cloudinary.com/dq52ggm0k/image/upload/v1688264648/cld-sample-4.jpg",
      } } />
      <Container sx={{paddingTop:"100px",paddingBottom: "100px"}}>
      <Box>

      <Typography variant='h4' fontWeight="700" marginLeft="26px" component="h1">
         Blog
      </Typography>

      <Box mt={4}>
            {blogs.map((blog)=>{
              return(
                
                <MuiLink key={blog.id} sx={{
                  "&:hover": {textDecoration: "none"}
                }} passHref component={Link} href={`/blog/${blog.slug}`}>
                <SinglePost
                
                header={blog.header}
                tag={blog.tag}
                content={blog.content}
                created={blog.created}
                slug={blog.slug}
                id={blog.id}
                description={blog.description}
              
              />
                <Divider
                sx={{
                  borderColor: '#E0E0E0',
                  marginLeft: "26px",
                  marginTop: '12px',
                }}
              />
                </MuiLink>
               
               
                
              )
            })}
     
      </Box>

     
      </Box>

      


    </Container>
    </Box>
  );
}
BlogListPage.Layout = MainLayout

export const getStaticProps: GetStaticProps<BlogListPageProps> = async(
    context: GetStaticPropsContext
)=>{

  //Convert markdowwn intro javascript
  const data = await GetBlogListFromMarkDown()
 

  

   

    return {
        props: {
            blogs: data
        }
    }
}
