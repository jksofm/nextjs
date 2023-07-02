import * as React from 'react';
import {Box,Typography,Link as MuiLink} from "@mui/material"
import Link from 'next/link';
export interface ErrorPageProps {
}

export default function ErrorPage (props: ErrorPageProps) {
  return (
    <Box mt={8} textAlign="center">
        <Typography variant="h2" component="h1">
            OPPS! SORRY,THIS PAGE IS NOT WORKING! PLEASE TRY AGAIN !
        </Typography>
        <MuiLink fontSize="2rem" color="primary.main" passHref component={Link} href="/">
            Go back home !
        </MuiLink>
    </Box>
  );
}
