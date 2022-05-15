import React, { useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { SEARCH_ENGINES } from '../../const';

export interface SearchBarProps {
	searchEngine: 'google' | 'bing' | 'duck';
}

const SearchBar = (props) => {
	const {
		searchEngine = 'google',
	} = props;

	const [ search, setSearch ] = useState('');

	const submitHandler = useCallback((e) => {
		e.preventDefault();
		if (search.length >= 3) {
			window.open(
				`${SEARCH_ENGINES[searchEngine]?.urlPrefix}${search.split(' ').join('+')}`,
				'_blank',
			);
			setSearch('');
		}
	}, [ search ]);

	return (
		<form
			name="SearchBarForm"
			id="SearchBarForm"
			noValidate
			autoComplete="off"
			style={{ display: 'block' }}
			onSubmit={submitHandler}
		>
			<TextField
				id="SearchBarForm_search"
				placeholder={`Search in ${SEARCH_ENGINES[searchEngine]?.name}`}
				variant="outlined"
				size="small"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				sx={{
					width: '100%',
				}}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
					fullWidth: true,
					sx: {
						width: '100%',
						borderRadius: '2rem',
					},
				}}
			/>
		</form>
	);
};

export default SearchBar;
