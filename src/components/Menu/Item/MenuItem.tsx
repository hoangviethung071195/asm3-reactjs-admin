import { NavLink } from "react-router-dom";
import { PropsWithChildren, createElement } from 'react';
import { MenuModel } from '../../../models/Menu.model';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import s from './MenuItem.module.scss';

export default function MenuItem(props: PropsWithChildren<MenuModel>) {
  const { menuName, href = '', iconEl, onClick } = props;

  return (
    <NavLink
      className={({ isActive }) =>
        "sidebar-item " + (isActive ? s["selected"] : "")
      }
      to={href}
      onClick={onClick}
    >
      <ListItemButton>
        <ListItemIcon className={s['text']}>
          {createElement(iconEl)}
        </ListItemIcon>
        <ListItemText primary={menuName} className={s['text']} />
      </ListItemButton>
    </NavLink>
  );
}
