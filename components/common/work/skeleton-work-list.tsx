import * as React from 'react';
import { Box, Stack, Divider } from '@mui/material';
import SkeletonWorkItem from './skeleton-work-item';
export interface SkeletonWorkListProps {
}

export default function SkeletonWorkList (props: SkeletonWorkListProps) {
  return (
    <Box>
    <Stack spacing={3}>
      
       
          <React.Fragment>
           <SkeletonWorkItem />
            <Divider
              sx={{
                borderColor: '#E0E0E0',

                marginTop: '12px',
              }}
            />
             <SkeletonWorkItem />
            <Divider
              sx={{
                borderColor: '#E0E0E0',

                marginTop: '12px',
              }}
            />
             <SkeletonWorkItem />
            <Divider
              sx={{
                borderColor: '#E0E0E0',

                marginTop: '12px',
              }}
            />
             <SkeletonWorkItem />
            <Divider
              sx={{
                borderColor: '#E0E0E0',

                marginTop: '12px',
              }}
            />
             <SkeletonWorkItem />
            <Divider
              sx={{
                borderColor: '#E0E0E0',

                marginTop: '12px',
              }}
            />
          </React.Fragment>
        
    
    </Stack>
  </Box>
  );
}
