import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GlobalStyles, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import config from '../../config';
import NotFound from '../NotFound';
import Dashboard from '../Dashboard';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      '"Noto Sans"',
      'sans-serif',
    ].join(','),
    fontWeightRegular: 300,
  },
});

const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{}} />
        <>
            <Routes>
                <Route path={config.routes.dashboard.path} element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    </ThemeProvider>
);

export default App;
