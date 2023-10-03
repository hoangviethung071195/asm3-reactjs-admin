import { Box, Divider, Drawer, List, Toolbar, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PropsWithChildren, useContext } from "react";
import AuthContext from '../../context/AuthContext';
import { LogoutOutlined } from '@ant-design/icons';
import { listMenu } from 'utils/constant/menu';
import MenuItem from './item/MenuItem';

export const drawerWidth: number = 240;
const DrawerSibar = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      border: '1px solid rgb(240, 240, 240)',
      fontSize: '1.1rem',
      position: 'relative',
      whiteSpace: 'nowrap',
      width: useMediaQuery((theme) => (theme as any).breakpoints.down('sm')) ? drawerWidth - 20 : drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        height: '100%',
      },
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(7),
        },
      }),
    },
  }),
);

export default function SideBar(props: PropsWithChildren<{
  open: boolean;
}>) {
  const { open } = props;
  const ctx = useContext(AuthContext);
  return (
    <DrawerSibar variant="permanent" open={open}>
      <Box overflow='hidden'>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
        </Toolbar>
        <Divider />
        <List component="nav">
          {listMenu.map(m => (
            <MenuItem key={m.menuName} menuName={m.menuName} href={m.href} iconEl={m.iconEl}></MenuItem>
          ))}
          <Divider sx={{ my: 1 }} />
          <MenuItem href='/login' menuName='Logout' iconEl={LogoutOutlined} onClick={ctx.onLogout}></MenuItem>
        </List>
      </Box>

    </DrawerSibar>

  );
}