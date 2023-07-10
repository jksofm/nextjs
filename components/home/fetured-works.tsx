import * as React from 'react';
import { Box, Container, Stack, Typography, Button, Grid ,Link as MuiLink} from '@mui/material';
import SinglePost from '../common/singlepost';
import Link from 'next/link';
import SingleWork from '../common/work/work-list';
import WorkList from '../common/work/work-list';
import { Work } from '@/models';

export interface FeaturedWorksProps {}

export default function FeaturedWorks(props: FeaturedWorksProps) {
  const dataWorks:Work[] = [
    {
      id: "1",
      title: 'Making a design system from sratch',
      createdAt: '1648363391671',
      tagList: ['Design',"Pattern"],
      shortDescription: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: "",
      updatedAt: "1648363391671",
      thumbnailUrl: "https://res.cloudinary.com/dq52ggm0k/image/upload/v1688265129/feature11_idzedr.jpg"
      ,
    },
    {
      id: "2",
      title: 'Vibrant Portraits of 2020',
      createdAt: '1648363391671',
      tagList: ['Illustration'],
      shortDescription: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: "",
      updatedAt: "1648363391671",
      thumbnailUrl: "https://res.cloudinary.com/dq52ggm0k/image/upload/v1688265128/feature22_jvcjd9.jpg"
      ,
    },
    {
      id: "3",
      title: '36 Days of Malayalam type',
      createdAt: '1648363391671',
      tagList: ['Typography'],
      shortDescription: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      fullDescription: "",
      updatedAt: "1648363391671",
      thumbnailUrl: "https://res.cloudinary.com/dq52ggm0k/image/upload/v1688265128/feature33_g7bajb.jpg"
      ,
    },
    
  
  ];
  return (
    <Box
      sx={{
       
        paddingBottom: '32px',
      }}
    >
      <Container>
        <Stack>
          <Box marginTop={1} marginBottom={2}>
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
                Featured Works
              </Typography>
           
             
            </Stack>
          </Box>
          <WorkList workList={dataWorks} />
        
        </Stack>
      </Container>
    </Box>
  );
}
