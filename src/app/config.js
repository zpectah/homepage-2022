export default {
	meta: {
		name: 'zpecter homepage',
		version: '20.0.1',
		year: 2008,
		language: 'cs-CZ'
	},
	routes: {
		notFound: {
			key: 'notFound',
			path: null,
			meta: {
				title: 'Error',
			},
		},
		dashboard: {
			key: 'dashboard',
			path: '/',
			meta: {
				title: 'Dashboard',
			},
		},
	},
	nav: [],
	ui: {
		apps: {
			enabled: true,
		},
		settings: {
			enabled: true,
		},
		layout: {
			search: {
				enabled: true,
			},
		},
		dashboard: {
			clock: {
				enabled: true,
			},
			links: {
				enabled: true,
			},
		},
	},
};
