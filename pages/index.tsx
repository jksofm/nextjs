import MainLayout from '@/layout/main'
import { Box } from "@mui/material"
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '../models'
import HeroSection from '@/components/home/hero'
import RecentPosts from '@/components/home/reccent-posts'
import FeaturedWorks from '@/components/home/fetured-works'
import { Seo } from '@/components/common'
import { useAuth } from '@/hooks'

const inter = Inter({ subsets: ['latin'] })

const Home: NextPageWithLayout = () => {
 
  // const {profile} = useAuth();

  return (
    <>
    
    <Box>
      <Seo data={{
        title:"Hello!I am here" ,
        description:"Just call me. 093540****",
        url: "https://nextjs-git-master-jksofm.vercel.app/",
        thumbnailUrl: "https://res.cloudinary.com/dq52ggm0k/image/upload/v1688281009/avatar_hsvmqc.png",
      } } />
    <HeroSection />
    <RecentPosts />
    <FeaturedWorks />
   </Box>
    </>
   
  )
}
Home.Layout = MainLayout
export default Home
