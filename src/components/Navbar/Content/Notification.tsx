import { BellOutlined } from '@ant-design/icons';
import {
  Badge,
  Box,
  IconButton
} from '@mui/material';

const Notification = () => {
  const iconBackColor = 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        disableRipple
        color="secondary"
        sx={{ color: 'text.primary', bgcolor: iconBackColor, fontSize: '1rem', padding: '12px' }}
      >
        <Badge badgeContent={4} color="primary" >
          <BellOutlined />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default Notification;
