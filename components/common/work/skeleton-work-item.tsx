import * as React from 'react';
import {Box,Grid,Stack, Typography,Link as  MuiLink,Skeleton} from "@mui/material"

export interface SkeletonWorkItemProps {
}

export default function SkeletonWorkItem (props: SkeletonWorkItemProps) {
  return (
    <Box>
   

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
         
              
               <Skeleton  sx={{width: "100%",minHeight: "200px",borderRadius: "8px" }} animation="wave" variant="rectangular" />
              
          
     
        </Grid>
        <Grid item xs={12} md={8}>
           <Stack>
           <Skeleton animation="wave" height={30} width="40%" />
        
             <Stack sx={{
              margin: "14px 0"
             }} flexDirection="row" alignItems="center">
     
             <Skeleton sx={{marginRight: 2}} animation="wave" height={15} width="10%" />
              
                <Skeleton sx={{marginRight: 2}} animation="wave" height={15} width="20%" />
             </Stack>
             <Skeleton sx={{marginRight: 2,marginTop: 1}} animation="wave" height={15} width="80%" />
             <Skeleton sx={{marginRight: 2,marginTop: 1}} animation="wave" height={15} width="80%" />
             <Skeleton sx={{marginRight: 2,marginTop: 1}} animation="wave" height={15} width="80%" />
             <Skeleton sx={{marginRight: 2,marginTop: 1}} animation="wave" height={15} width="60%" />
           
           </Stack>
        </Grid>
      </Grid>
  
  </Box>
  );
}
