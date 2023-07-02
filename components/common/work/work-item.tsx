import { Work } from '@/models';
import * as React from 'react';
import {Box,Grid,Stack, Typography} from "@mui/material"
import Image from 'next/image';
import image1 from "../../../images/home/feature11.jpg"
import format from 'date-fns/format'


export default function WorkItem ({title,shortDescription,fullDescription,created,updated,thumbUrl,tagList,id}: Work) {
  return (
    <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
          <Box
          sx={{
           
          }}
          >
            <Image width={246} height={180} alt="Image Work" src={thumbUrl} layout='responsive' />
          </Box>
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
               >{format(Number(created),"yyyy")}</Typography>
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
    </Box>
  );
}
