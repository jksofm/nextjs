import { Work } from '@/models';
import * as React from 'react';
import { Box, Stack, Divider } from '@mui/material';
import WorkItem from './work-item';
import Image from 'next/image';

interface WorkProps {
  workList: Work[];
 
  
}

export default function WorkList({ workList }: WorkProps ) {
  if (workList?.length === 0){
    return (
      <Image src="https://i.pinimg.com/originals/49/e5/8d/49e58d5922019b8ec4642a2e2b9291c2.png" alt="No Data" width={400} height={300} />
    )
  };
  return (
    <Box>
      <Stack spacing={3}>
        {workList?.map((work) => {
          return (
            <React.Fragment key={work.id}>
              <WorkItem
                workData={work}
               
              />
              <Divider
                sx={{
                  borderColor: '#E0E0E0',

                  marginTop: '12px',
                }}
              />
            </React.Fragment>
          );
        })}
      </Stack>
    </Box>
  );
}
