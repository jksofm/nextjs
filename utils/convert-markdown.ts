import path from "path"
import fs from "fs"
import matter from 'gray-matter'
import { Post } from "@/models"
import { remark } from 'remark';
import html from 'remark-html';
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
        const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
      const contentHtml = processedContent.toString();
      
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


