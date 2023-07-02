import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {Box,Link as MUIlink,Container,Stack} from "@mui/material"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import clsx from "clsx"
import { ROUTE_LIST } from './routes';
import { useRouter } from 'next/router';
export interface HeaderMobileProps {
}
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function HeaderMobile (props: HeaderMobileProps) {
    const router = useRouter()
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });

      const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
    const list = (anchor: Anchor) => (
        <Box
          sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {ROUTE_LIST.map((route, index) => (
              <ListItem onClick={()=>{
                router.push(route.path)
              }} key={route.path} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                   <route.icon />
                  </ListItemIcon>
                  <ListItemText className={clsx({active : router.pathname === route.path})} primary={route.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          {/* <Divider /> */}
          {/* <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List> */}
        </Box>
      );
  return (
    <Box display={{xs:'block',lg:"none"}} component="header" py={2} >
    <Container>
    <Stack direction="row" justifyContent="flex-end">
    <SwipeableDrawer
            anchor={"top"}
            open={state["top"]}
            onClose={toggleDrawer("top", false)}
            onOpen={toggleDrawer("top", true)}
          >
            {list("top")}
          </SwipeableDrawer>
    <MenuIcon onClick={toggleDrawer("top", true)} sx={{marginLeft:"auto"}} />

    </Stack>
    </Container>
  </Box>
  );
}
