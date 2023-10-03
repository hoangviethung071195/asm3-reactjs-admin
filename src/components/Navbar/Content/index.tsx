import { GithubOutlined } from '@ant-design/icons';
import { IconButton, Link, useMediaQuery } from '@mui/material';
import Notification from './notification';
import Profile from './profile';

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => (theme as any).breakpoints.down('md'));

  return (
    <>
      <IconButton
        component={Link}
        href="https://github.com/hoangviethung071195"
        target="_blank"
        disableRipple
        color="secondary"
        title="Download Free Version"
        sx={{ color: 'text.primary', bgcolor: 'grey.100', fontSize: '1rem', padding: '12px' }}
      >
        <GithubOutlined />
      </IconButton>

      <Notification />
      {!matchesXs && <Profile />}
    </>
  );
};

export default HeaderContent;
