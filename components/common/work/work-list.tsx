import { Work } from '@/models';
import * as React from 'react';
import { Box, Stack, Divider } from '@mui/material';
import WorkItem from './work-item';

interface WorkProps {
  workList: Work[];
}

export default function WorkList({ workList }: WorkProps) {
  if (workList.length === 0) return null;
  return (
    <Box>
      <Stack spacing={3}>
        {workList.map((work) => {
          return (
            <React.Fragment key={work.id}>
              <WorkItem
                tagList={work.tagList}
                title={work.title}
                created={work.created}
                updated={work.created}
                shortDescription={work.shortDescription}
                fullDescription={work.fullDescription}
                thumbUrl={work.thumbUrl}
                id={work.id}
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
