import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { IconButton, SxProps, Theme, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { PropsWithChildren } from 'react';
import HeaderContent from './Content';
import { drawerWidth } from 'components/Menu/SideBar';


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const NavbarAnimation = styled(
  MuiAppBar,
  {
    shouldForwardProp: (prop) => prop !== 'open',
  }
)<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: useMediaQuery((theme) => (theme as any).breakpoints.down('sm')) ? drawerWidth - 20 : drawerWidth,
    width: `calc(100% - ${useMediaQuery((theme) => (theme as any).breakpoints.down('sm')) ? drawerWidth - 20 : drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Navbar(props: PropsWithChildren<{ open: boolean; setOpen(open: boolean): void; }>) {
  const { open, setOpen } = props;
  const iconBackColor = 'grey.100';
  const iconBackColorOpen = 'grey.200';
  const navbarSx: SxProps<Theme> = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
    borderBottom: '1px solid rgb(240, 240, 240)',
    bgcolor: 'AppWorkspace',
    boxShadow: 'none'
  };

  return (
    <NavbarAnimation open={open} sx={navbarSx} >
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          disableRipple
          aria-label="open drawer"
          onClick={() => setOpen(!open)}
          edge="start"
          color="secondary"
          sx={{
            color: 'text.primary',
            bgcolor: open ? iconBackColorOpen : iconBackColor,
            ml: { xs: 0, lg: -2 },
            fontSize: '1rem',
            padding: '12px'
          }}
        >
          {!open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </IconButton>
        <Typography
          variant="body1"
          fontWeight='500'
          color="black"
          noWrap
          sx={{ flexGrow: 1, marginLeft: '10px', fontSize: '1rem' }}
        >
          Administrator
        </Typography>
        <HeaderContent />
      </Toolbar>
    </NavbarAnimation>
  );
}
