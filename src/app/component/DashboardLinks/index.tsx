import React from 'react';
import {
	Box,
	Stack,
	Typography,
	Chip,
} from '@mui/material';

export interface DashboardLinksProps {
	links: {
		path: string,
		label: string,
	}[],
}

const DashboardLinks = (props: DashboardLinksProps) => {
	const { links } = props;

	const linkHandler = (path: string) => window.open(path, '_blank');

	return (
		<Stack
			direction="row"
			flexWrap="wrap"
			alignItems="center"
			justifyContent="center"
			sx={{
				width: '75%',
				p: 2,
			}}
		>
			{links.map((link) => (
				<Chip
					key={link.path}
					label={link.label}
					onClick={() => linkHandler(link.path)}
					size="medium"
					sx={{
						m: '.5rem',
						color: 'inherit',
					}}
				/>
			))}
		</Stack>
	);
};

export default DashboardLinks;
