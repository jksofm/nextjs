import * as React from 'react';
import { LayoutProps } from '../models';



export default function EmptyLayout (props: LayoutProps) {
  return (
    <div>
      {props.children}
    </div>
  );
}
