import * as React from 'react';
import {Box,Link as MUIlink,Container,Stack} from "@mui/material"

import { ROUTE_LIST } from './routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from "clsx"
export interface HeaderDesktopProps {
}

export default function HeaderDesktop (props: HeaderDesktopProps) {
    const router = useRouter()

  return (
    <Box display={{lg:'block',xs:"none"}} component="header" py={2} textAlign="center">
    <Container>
      <Stack direction="row" justifyContent="flex-end">
      {ROUTE_LIST.map((route) => (
          <React.Fragment key={route.path}>
            <MUIlink sx={{ml:2,fontWeight:"Medium"}} className={clsx({active : router.pathname === route.path})} component={Link} href={route.path} passHref>
              {route.label}
            </MUIlink>
          </React.Fragment>
        ))}
      </Stack>
    </Container>
  </Box>
  );
}
