import * as React from 'react';
import {Box} from "@mui/material"
import HeaderDesktop from './header/header-desktop';
import HeaderMobile from './header/header-mobile';
export interface HeaderProps {
}

export default function Header (props: HeaderProps) {
  return (
   <>
   <HeaderDesktop />
   <HeaderMobile />
   </>
  );
}
