import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import AuthContext from '../context/AuthContext';
import { grey } from '@mui/material/colors';
import SideBar from 'components/sidebar/Sidebar';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Layout(props: React.PropsWithChildren) {
  const { isAuthenticated, currentUser } = useContext(AuthContext);
  const [open, setOpen] = React.useState(true);
  const location = useLocation();
  const path = location.pathname.split('/')[1] || 'Dashboard';

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        {
          isAuthenticated &&
          <>
            <Navbar open={open} setOpen={(value) => setOpen(value)}></Navbar>
            <SideBar open={open} />
          </>
        }
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5" fontSize={'1rem'} color={grey[700]} fontWeight="400" textTransform='capitalize' mb={3} display={'inline-block'}>Admin / </Typography> <Typography variant="h5" fontSize={'1rem'} color={grey[900]} fontWeight="400" textTransform='capitalize' mb={3} display={'inline-block'}>{path}</Typography>
              </Grid>
              <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5" fontSize={'1.2rem'} color={grey[900]} fontWeight="500" textTransform='capitalize' paddingBottom={3}>{path}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px'
                  }}
                >
                  <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                    {props.children}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
