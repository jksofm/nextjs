import { Post } from "@/models";
import fs from "fs";
import matter from 'gray-matter';
import path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeSlug from "rehype-slug";
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkPrism from "remark-prism";
import remarkRehype from 'remark-rehype';
import remarkToc from "remark-toc";
import { unified } from 'unified';
const BLOG_FOLDER = path.join(process.cwd(),"blog-md-files")
export async function GetBlogListFromMarkDown() : Promise<Post[]> {
    const fileNameList = fs.readdirSync(BLOG_FOLDER)
    // console.log(fileNameList)
    const postList: Post[] = []
   
    for(const fileName of fileNameList){
        //Đoc file
        const filePath = path.join(BLOG_FOLDER,fileName)
        const fileContent = fs.readFileSync(filePath, "utf8")

        /// Convert content ve object
       
        const  matterResult = matter(fileContent,{excerpt_separator: '<!-- truncate-->'})
       
        const {data,excerpt,content} = matterResult
      
        postList.push({
            id: fileName,
            slug: data.slug,
            header: data.title,
            author: {
                name: data.author,
                title: data.author_title,
                profileUrl : data.author_url,
                avatarUrl: data.author_image_url

            },
            tag: `${data.tags.join(", ")}`,
            created: `2023`,
            content: content,
            description: excerpt || ""


        })
       
    }
    

  
    return postList
}
export async function GetBlogListId():Promise<string[]> {
    const fileNameList = fs.readdirSync(BLOG_FOLDER)
    // console.log(fileNameList)
  
    const postListId: any[] = []
    for(const fileName of fileNameList){
        //Đoc file
        const filePath = path.join(BLOG_FOLDER,fileName)
        const fileContent = fs.readFileSync(filePath, "utf8")

        /// Convert content ve object
       
        const  matterResult = matter(fileContent,{excerpt_separator: '<!-- truncate-->'})
       
        const {data,excerpt,content} = matterResult
      
       
        postListId.push(data.slug)
    }
    

  
    return postListId
}
export async function GetBlogFromId(postId:string|string[]):Promise<Post> {
    const fileNameList = fs.readdirSync(BLOG_FOLDER)
    // console.log(fileNameList)
  
    let postData:any;
    for(const fileName of fileNameList){
        //Đoc file
        const filePath = path.join(BLOG_FOLDER,fileName)
        const fileContent = fs.readFileSync(filePath, "utf8")

        /// Convert content ve object
       
        const  matterResult = matter(fileContent,{excerpt_separator: '<!-- truncate-->'})
       
        const {data,excerpt,content} = matterResult
        // const processedContent = await remark()
        // .use(html)
        // .process(matterResult.content);
          const processdContent = await unified()
          .use(remarkParse)
          .use(remarkToc)
          .use(remarkPrism)
          .use(remarkRehype)
          .use(rehypeSlug)
          .use(rehypeAutolinkHeadings,{behavior: "wrap"})
          .use(rehypeDocument, {title: '👋🌍'})
          .use(rehypeFormat)
          .use(rehypeStringify)
          .process(content)
          
      const contentHtml = processdContent.toString();
      
        if(data.slug === postId){
            postData = {
                id: fileName,
                slug: data.slug,
                header: data.title,
                htmlContent: contentHtml,
                author: {
                    name: data.author,
                    title: data.author_title,
                    profileUrl : data.author_url,
                    avatarUrl: data.author_image_url
    
                },
                tag: `${data.tags.join(", ")}`,
                created: `2023`,
                content: content,
                description: excerpt || ""}
                
        }
       
    }
    

  
    return postData
}



