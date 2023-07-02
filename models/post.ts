export interface Author {
    name : string
    title : string
    profileUrl: string
    avatarUrl : string
}


export interface Post {
    id: string | number
    header: string,
    created : string,
    tag: string,
    content: string,
    htmlContent?: string,
    slug: string,
    author? : Author
    description: string 
}