import React, { useEffect, useState } from 'react';
import {
	Drawer,
	Stack,
	Divider,
} from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import data from './data.json';
import Scrollable from '../Scrollable';

export interface AppsDrawerProps {
	isOpen?: boolean;
	onClose: () => void;
}

const AppsDrawer = (props: AppsDrawerProps) => {
	const {
		isOpen,
		onClose,
	} = props;

	const [ open, setOpen ] = useState(isOpen);
	const [ panelCollapsed, setPanelCollapsed ] = useState({
		google: true,
		apple: false,
		microsoft: false,
	});

	const closeHandler = () => {
		setOpen(false);
		onClose();
	};
	const linkHandler = (path: string) => window.open(path, '_blank');

	useEffect(() => setOpen(isOpen),[ isOpen ]);

	return (
		<Drawer
			anchor="left"
			open={open}
			onClose={closeHandler}
			sx={{
				width: '250px',
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: '250px',
					boxSizing: 'border-box',
				},
			}}
		>
			<Scrollable>
				<Stack
					direction="column"
					spacing={2}
					sx={{}}
				>
					<List
						sx={{ width: '100%' }}
						component="nav"
					>
						<ListItemButton
							onClick={() => setPanelCollapsed({
								...panelCollapsed,
								google: !panelCollapsed.google,
							})}
						>
							<ListItemText
								primary="Google apps"
								sx={{
									'& > span': {
										fontWeight: 500,
									},
								}}
							/>
							{panelCollapsed.google ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse
							in={panelCollapsed.google}
							timeout="auto"
							unmountOnExit
						>
							{data.apps.Google.map((link) => (
								<ListItemButton
									key={link.path}
									onClick={() => linkHandler(link.path)}
								>
									<ListItemText primary={link.label} />
								</ListItemButton>
							))}
						</Collapse>
						<Divider />
						<ListItemButton
							onClick={() => setPanelCollapsed({
								...panelCollapsed,
								apple: !panelCollapsed.apple,
							})}
						>
							<ListItemText
								primary="Apple apps"
								sx={{
									'& > span': {
										fontWeight: 500,
									},
								}}
							/>
							{panelCollapsed.apple ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse
							in={panelCollapsed.apple}
							timeout="auto"
							unmountOnExit
						>
							{data.apps.Apple.map((link) => (
								<ListItemButton
									key={link.path}
									onClick={() => linkHandler(link.path)}
								>
									<ListItemText primary={link.label} />
								</ListItemButton>
							))}
						</Collapse>
						<Divider />
						<ListItemButton
							onClick={() => setPanelCollapsed({
								...panelCollapsed,
								microsoft: !panelCollapsed.microsoft,
							})}
						>
							<ListItemText
								primary="Microsoft apps"
								sx={{
									'& > span': {
										fontWeight: 500,
									},
								}}
							/>
							{panelCollapsed.microsoft ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse
							in={panelCollapsed.microsoft}
							timeout="auto"
							unmountOnExit
						>
							{data.apps.Microsoft.map((link) => (
								<ListItemButton
									key={link.path}
									onClick={() => linkHandler(link.path)}
								>
									<ListItemText primary={link.label} />
								</ListItemButton>
							))}
						</Collapse>

					</List>
				</Stack>
			</Scrollable>
		</Drawer>
	);
};

export default AppsDrawer;
