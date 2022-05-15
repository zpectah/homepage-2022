import React, { useEffect, useMemo, useState } from 'react';
import {
	Drawer, Stack,
	ToggleButton,
	ToggleButtonGroup,
} from '@mui/material';

import { SEARCH_ENGINES, LANGUAGES } from '../../const';
import Scrollable from '../Scrollable';

export interface SettingsDrawerProps {
	isOpen?: boolean;
	onClose: () => void;
	searchEngine: string;
	onSearchEngineChange: (engine: string) => void;
	language: string;
	onLanguageChange: (engine: string) => void;
}

const SettingsDrawer = (props: SettingsDrawerProps) => {
	const {
		isOpen,
		onClose,
		searchEngine,
		onSearchEngineChange,
		language,
		onLanguageChange,
	} = props;

	const [ open, setOpen ] = useState(isOpen);

	const closeHandler = () => {
		setOpen(false);
		onClose();
	};
	const changeEngineHandler = (value: string) => onSearchEngineChange(value);
	const changeLanguageHandler = (value: string) => onLanguageChange(value);

	const engineOptions = useMemo(() => {
		const tmp = [];
		for (const key in SEARCH_ENGINES) {
			tmp.push({
				value: key,
				label: SEARCH_ENGINES[key].name,
			});
		}

		return tmp;
	}, [ SEARCH_ENGINES ]);

	useEffect(() => setOpen(isOpen),[ isOpen ]);

	return (
		<Drawer
			anchor="right"
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
					sx={{
						p: 2,
					}}
				>
					<ToggleButtonGroup
						value={searchEngine}
						onChange={(e, value) => changeEngineHandler(value)}
						exclusive
						orientation="vertical"
						size="small"
					>
						{engineOptions.map((eng) => (
							<ToggleButton
								key={eng.value}
								value={eng.value}
							>
								{eng.label}
							</ToggleButton>
						))}
					</ToggleButtonGroup>
					<ToggleButtonGroup
						value={language}
						onChange={(e, value) => changeLanguageHandler(value)}
						exclusive
						orientation="vertical"
						size="small"
					>
						{LANGUAGES.map((lng) => (
							<ToggleButton
								key={lng}
								value={lng}
							>
								{lng}
							</ToggleButton>
						))}
					</ToggleButtonGroup>
				</Stack>
			</Scrollable>
		</Drawer>
	);
};

export default SettingsDrawer;
