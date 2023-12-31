import PropTypes from 'prop-types';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import MainCard from '../Table/border/MainCard';
import { FallOutlined, RiseOutlined } from '@ant-design/icons';
import s from './analyticEcommerce.module.scss';

const AnalyticEcommerce = ({ color, title, count, percentage, isLoss, extra }) => (
  <MainCard contentSX={{ p: 2.25 }}>
    <Stack spacing={0.5}
      sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
    >
      <Typography variant="h6" color="textSecondary">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h4" color="inherit">
            {count}
          </Typography>
        </Grid>
        {percentage && (
          <Grid item>
            <Chip
              variant="filled"
              color={color}
              icon={
                <>
                  {!isLoss && <RiseOutlined className={s['rise-icon']} />}
                  {isLoss && <FallOutlined className={s['rise-icon']} />}
                </>
              }
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1, borderRadius: '6px', paddingTop: '16px', paddingBottom: '13px' }}
              size="small"
            />
          </Grid>
        )}
      </Grid>
    </Stack>
    <Box sx={{ pt: 2.25 }}>
      <Typography variant="caption" color="textSecondary">
        You made an extra{' '}
        <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
          {extra}
        </Typography>{' '}
        this year
      </Typography>
    </Box>
  </MainCard>
);

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
  color: 'primary'
};

export default AnalyticEcommerce;
