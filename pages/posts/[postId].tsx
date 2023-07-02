import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface PostDetailPageProps {
    post: any
}

export default function PostDetailPage ({post}: PostDetailPageProps) {
    const router = useRouter()
    console.log(post);
    if(!post) return <h1>Khoong co thong tin</h1>
  return (
    <div>
      <h1>Post Detail Page</h1>
      <p>title : {post.title}</p>
      <p>author : {post.author}</p>

      <p>des : {post.description}</p>


      <h2><Link passHref href={"/posts"}>
        Back home
        </Link></h2>


     
    </div>
  );
}

export const getStaticPaths: GetStaticPaths =  async()=>{
    const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
    const data = await response.json()
  

    return {
        paths: data.data.map((item:any)=>{
            return {
                params: {postId: item.id}
            }
        }),
        fallback: false,
    }
}
export const getStaticProps: GetStaticProps<PostDetailPageProps> = async(
    context: GetStaticPropsContext
)=>{
    const postId = context.params?.postId
  
    if(!postId){return {notFound:true}}

    const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
    const data = await response.json()
  

    return {
        props: {
            post: data
        }
    }
}
