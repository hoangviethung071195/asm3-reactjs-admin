import PropTypes from 'prop-types';
import { useContext } from 'react';
import {
  Avatar,
  Box,
  ButtonBase,
  Stack,
  Typography
} from '@mui/material';
import AuthContext from 'context/authContext';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: 'secondary.lighter' }
        }}
        aria-label="open profile"
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" src={'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'} sx={{ width: 34, height: 34 }} />
          <Typography variant="body2" color='black' fontWeight={500}>{currentUser.fullName}</Typography>
        </Stack>
      </ButtonBase>
    </Box>
  );
};

export default Profile;
