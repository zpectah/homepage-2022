import React from 'react';
import { Box } from '@mui/material';

import data from './data.json';
import {
  Layout,
  DashboardClock,
  DashboardLinks,
} from '../../component';

const Dashboard = () => (
    <Layout>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <DashboardClock />
        <DashboardLinks
          links={data.links}
        />
      </Box>
    </Layout>
);

export default Dashboard;
