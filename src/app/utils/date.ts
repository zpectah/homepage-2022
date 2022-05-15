export const getTwoDecimals = (number) => {
	let string = String(number);
	if (Number(number) <= 9) string = '0' + '' + number;

	return String(string);
};

export const getTodayObject = () => {
	const D = new Date();
	const getDayOfTheYear = () => {
		let start: Date = new Date(D.getFullYear(), 0, 0);
		let diff = Number(D) - Number(start) + (start.getTimezoneOffset() - D.getTimezoneOffset()) * 60 * 1000;
		let oneDay = 1000 * 60 * 60 * 24;
		return Math.floor(diff / oneDay);
	};

	return {
		year: D.getFullYear(),
		month: D.getMonth() + 1,
		day: D.getDate(),
		hour: getTwoDecimals(D.getHours()),
		minute: getTwoDecimals(D.getMinutes()),
		second: getTwoDecimals(D.getSeconds()),
		dayOfTheWeek: D.getDay(),
		dayOfTheYear: getDayOfTheYear(),
	} as {
		year: number;
		month: number;
		day: number;
		hour: string;
		minute: string;
		second: string;
		dayOfTheWeek: number;
		dayOfTheYear: number;
	};
};
