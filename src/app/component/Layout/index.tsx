import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
	Box,
	Fab,
} from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';

import config from '../../config';
import storage from '../../utils/storage';
import { useRandomImage } from '../../hooks';
import Footer from './Footer';
import AppsDrawer from './AppsDrawer';
import SettingsDrawer from './SettingsDrawer';
import SearchBar from '../SearchBar';

export interface LayoutProps {
	children: React.ReactNode;
	metaTitle?: string;
}

const Layout: React.FC<LayoutProps> = (props) => {
	const {
		children,
		metaTitle,
	} = props;

	const [ bgImage, setBgImage ] = useState(null);
	const [ layoutState, setLayoutState ] = useState({
		language: storage.get('APP_LANGUAGE') ?? 'cs-CZ',
		searchEngine: storage.get('APP_SEARCH_ENGINE') ?? 'google'
	});
	const [ appsOpen, setAppsOpen ] = useState(false);
	const [ settingsOpen, setSettingsOpen ] = useState(false);
	const { src } = useRandomImage();

	const openAppsHandler = () => {
		setAppsOpen(true);
	};
	const closeAppsHandler = () => {
		setAppsOpen(false);
	};
	const openSettingsHandler = () => {
		setSettingsOpen(true);
	};
	const closeSettingsHandler = () => {
		setSettingsOpen(false);
	};
	const changeLanguageHandler = (lang: string) => {
		setLayoutState({
			...layoutState,
			language: lang,
		});
		storage.set('APP_LANGUAGE', lang);
		closeSettingsHandler();
	};
	const changeSearchEngineHandler = (engine: string) => {
		setLayoutState({
			...layoutState,
			searchEngine: engine,
		});
		storage.set('APP_SEARCH_ENGINE', engine);
		closeSettingsHandler();
	};

	useEffect(() => setBgImage(src));

	return (
		<>
			<Helmet>
				<title>{metaTitle ? `${metaTitle} | ` : ''}{config.meta.name}</title>
			</Helmet>
			{config.ui.apps.enabled && (
				<AppsDrawer
					isOpen={appsOpen}
					onClose={closeAppsHandler}
				/>
			)}
			{config.ui.settings.enabled && (
				<SettingsDrawer
					isOpen={settingsOpen}
					onClose={closeSettingsHandler}
					searchEngine={layoutState.searchEngine}
					onSearchEngineChange={changeSearchEngineHandler}
					language={layoutState.language}
					onLanguageChange={changeLanguageHandler}
				/>
			)}
			<Box
				key={bgImage}
				sx={{
					width: '100%',
					height: '100vh',
					position: 'relative',
					color: 'rgb(250,250,250)',
					'&::before': {
						content: '""',
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: 0,
						background: `url(${bgImage}) no-repeat center center fixed`,
						backgroundSize: 'cover',
						filter: 'grayscale(100%)',
					},
					'&::after': {
						content: '""',
						width: '100%',
						height: '100%',
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: 1,
						background: 'rgba(0,0,0,.85)',
					},
				}}
			>
				<Box
					sx={{
						width: '100%',
						height: '100%',
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						zIndex: 2,
					}}
				>
					<Box
						sx={{
							width: '100%',
							p: 2,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<Box>
							{config.ui.apps.enabled && (
								<Fab
									// color="primary"
									aria-label="Apps"
									size="small"
									onClick={openAppsHandler}
								>
									<AppsIcon />
								</Fab>
							)}
						</Box>
						<Box
							sx={{ width: '40vw' }}
						>
							<SearchBar
								searchEngine={layoutState.searchEngine}
							/>
						</Box>
						<Box>
							{config.ui.settings.enabled && (
								<Fab
									// color="primary"
									aria-label="Settings"
									size="small"
									onClick={openSettingsHandler}
								>
									<SettingsIcon />
								</Fab>
							)}
						</Box>
					</Box>
					<Box
						sx={{
							width: '100%',
							p: 2,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							flex: 1,
						}}
					>
						{children}
					</Box>
					<Box
						sx={{
							width: '100%',
							p: 2,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Footer />
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default Layout;
