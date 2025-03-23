const getTime = (username, msg) => {
	const ans = {
		username,
		text: msg,
		time: new Date().toLocaleTimeString()
	};
	return ans
}

const getLocationTime = (username, url) => {
	const ans = {
		username,
		url,
		time: new Date().toLocaleTimeString()
	}
	return ans;
}

module.exports = {
	getTime,
	getLocationTime
}