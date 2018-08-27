const API_KEY = 'AIzaSyAkoQP-RNQ78mpwcwQJHcQYXFNu_1hyIGQ';

class ajaxHelper {
	constructor(accessToken) {
		this.accessToken = accessToken;
	}

	get(url, params) {
		const urlObj = new URL(url);
		params.key = API_KEY;
		params.access_token = this.accessToken;
		Object.keys(params).forEach(key => urlObj.searchParams.append(key, params[key]));
		return fetch(urlObj);
	}
};


export default ajaxHelper;