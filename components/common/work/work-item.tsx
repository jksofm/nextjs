import { Work } from '@/models';
import * as React from 'react';
import {Box,Grid,Stack, Typography,Link as  MuiLink,Skeleton} from "@mui/material"
import Image from 'next/image';
import Link from 'next/link';
import image1 from "../../../images/home/feature11.jpg"
import format from 'date-fns/format'
import { useWorks } from '@/hooks';

interface WorkItemProps {
  workData : Work
  
}
export default function WorkItem ({workData}:WorkItemProps) {
    const {title,shortDescription,fullDescription,createdAt,updatedAt,thumbnailUrl,tagList,id} = workData
   
    
  return (
    <Box>
      <MuiLink sx={{
        "&:hover": {
          textDecoration: "none"
        }
      }} href={`/works/${id}`} component={Link} passHref>

        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            {false ? (
                <>
                 <Skeleton  sx={{width: "100%",minHeight: "200px",borderRadius: "8px" }} animation="wave" variant="rectangular" />
                </>
            ):(
              <Box
          
              >
                <Image width={246} height={180} alt="Image Work" src={thumbnailUrl} layout='responsive' />
              </Box>
            )}
       
          </Grid>
          <Grid item xs={12} md={8}>
             <Stack>
               <Typography sx={{
                fontWeight:"700"
               }} fontSize={{
                xs:"24px",
                md: "30px"
               }} variant="h4" component="h1">
                    {title}
               </Typography>
               <Stack sx={{
                margin: "14px 0"
               }} flexDirection="row" alignItems="center">
                <Typography  fontSize={{
                xs:"14px",
                md: "18px"
               }}  marginRight={2}
               
               sx={{
                background: "#142850",
                color: "White",
                fontWeight: "bold",
                borderRadius: "16px",
                padding: "2px 8px"
               }}
               >{format(Number(createdAt),"yyyy")}</Typography>
                <Typography
                 fontSize={{
                    xs:"16px",
                    md: "20px"
                   }} 
                   color="#8695A4"
                >{tagList.join(', ')}</Typography>
               </Stack>
               <Typography sx={{
                fontSize:"16px"
               }}>
                {shortDescription}
               </Typography>
             </Stack>
          </Grid>
        </Grid>
      </MuiLink>
    </Box>
  );
}
