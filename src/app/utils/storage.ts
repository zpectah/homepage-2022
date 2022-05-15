const storage = {
	set: (key: string, value: string) => {
		localStorage.setItem(key, value);
	},
	get: function (key: string) {
		return localStorage.getItem(key);
	},
	remove: function (key: string) {
		localStorage.removeItem(key);
	},
	clearAll: function () {
		localStorage.clear();
	},
};

export default storage;