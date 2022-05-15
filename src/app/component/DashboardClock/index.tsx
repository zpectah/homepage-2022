import React, { useState, useEffect } from 'react';
import {
	Box,
	Stack,
	Typography,
	Chip,
} from '@mui/material';

import data_calendar_cs from '../../data/cs-CZ/calendar.json';
import data_holidays_cs from '../../data/cs-CZ/holidays.json';
import { getTodayObject } from '../../utils/date';

export interface DashboardClockProps {}

const DashboardClock = (props: DashboardClockProps) => {
	const {} = props;

	const locales = {
		calendar: data_calendar_cs,
		holidays: data_holidays_cs,
	};
	const interval = 1000;
	let timer: any = null;

	const [ today, setToday ] = useState(getTodayObject());
	const [ todayHoliday, setTodayHoliday ] = useState(locales.holidays[today.month][today.day]);

	useEffect(() => {
		timer = setInterval(() => {
			const nt = getTodayObject();
			setToday(nt);
			setTodayHoliday(locales.holidays[nt.month][nt.day]);
		}, interval);

		return () => clearInterval(timer);
	});

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'row',
				gap: '1rem',
			}}
		>
			<Stack
				spacing={1}
				alignItems="center"
				justifyContent="center"
			>
				<Typography
					variant="h1"
					sx={{
						lineHeight: 1.05,
						fontWeight: 500,
					}}
				>
					{today.hour}:{today.minute}
				</Typography>
				<Typography
					variant="h6"
				>
					{locales.calendar.day[today.dayOfTheWeek]}
					&nbsp;
					{today.day}. {locales.calendar.month[today.month]}
					&nbsp;
					{today.year}
				</Typography>
				<Stack
					direction="row"
					flexWrap="wrap"
					spacing={2}
					sx={{ pt: 1 }}
				>
					{todayHoliday.map((holiday) => (
						<Chip
							key={holiday}
							label={holiday}
							color="info"
							size="small"
							sx={{ flex: 'none' }}
						/>
					))}
				</Stack>
			</Stack>
		</Box>
	);
};

export default DashboardClock;
