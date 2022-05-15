import React from 'react';
import { Typography } from '@mui/material';

import config from '../../config';

const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<Typography
			variant="caption"
			sx={{ opacity: .5 }}
		>
			{config.meta.year} - {year} | {config.meta.name} v{config.meta.version}
		</Typography>
	);
};

export default Footer;
