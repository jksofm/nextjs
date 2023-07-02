import * as React from 'react';
import {Box,Stack,Divider} from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Post } from '@/models/post';


export default function SinglePost ({header,created,content,tag}: Post) {
  return (
    <Card sx={{padding: "14px 10px",boxShadow:"none"}}>
    <CardActionArea>
     
      <CardContent>
        <Typography sx={{fontWeight: "700"}} gutterBottom variant="h5" component="h2">
        {header}
        </Typography>
        <Stack marginTop="17px" flexDirection="row">
         <Typography fontSize={{
            xs: "16px",
            md: "18px"
         }}>{created}</Typography>
         <Divider  sx={{ margin:"0 1.4rem"}} orientation="vertical" variant="middle" flexItem />
         <Typography fontSize={{
            xs: "16px",
            md: "18px"
         }}>{tag}</Typography>
        </Stack>
        <Typography marginTop="10px" fontSize="16px" variant="body2" color="#21243D">
        {content}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  );
}
