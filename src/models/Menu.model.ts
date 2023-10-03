import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import { IconContextProps } from '@ant-design/icons/lib/components/Context';
import Icon from '@ant-design/icons/lib/components/Icon';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Provider } from 'react';

export interface MenuModel {
  menuName: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  iconEl: typeof Icon
}