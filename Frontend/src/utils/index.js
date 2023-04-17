// general helper functions

export const capitaliseText = (val) => {
	val = String(val).charAt(0).toUpperCase() + String(val).slice(1);
	return val;
};

export const capitaliseTextStrict = ( val ) => {
	let newStr = "";
	for(let i = 0; i < val.length; i++) {
		if (i === 0) {
			newStr += val[i].toUpperCase();
		} else {
			newStr += val[i].toLowerCase();
		}
	}
	return newStr;
}

export const isLoggedin = () => {
	if(lS.get('auth')) {
		return true;
	} else {
		return false;
	}
}

export const lS = {
	get: (key) => {
		const ls = localStorage.getItem('DBMS') && JSON.parse(localStorage.getItem('DBMS'));
		if (ls && ls[key]) {
			return ls[key];
		} else {
			return null;
		}
	},
	set: (key, value) => {
		const ls = localStorage.getItem('DBMS') && JSON.parse(localStorage.getItem('DBMS'));
		if (ls) {
			ls[key] = value;
			localStorage.setItem('DBMS', JSON.stringify(ls));
		} else {
			let data = {};
			data[key] = value;
			localStorage.setItem('DBMS', JSON.stringify(data));
		}
	},
	remove: (key) => {
		const ls = localStorage.getItem('DBMS') && JSON.parse(localStorage.getItem('DBMS'));
		if (ls) {
			delete(ls[key]);
			localStorage.setItem('DBMS', JSON.stringify(ls));
		}
		return true;
	}
}
window.lS = lS;

export const getReadableTime = (duration) => {
	// get number of full minutes
	const minutes = Math.floor(duration / 60);

	// get remainder of seconds
	const seconds = duration % 60;

	return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export const scroll = (config = { top: 0, left: 0 }, el = window) => {
	try {
		el.scroll({
			...config,
			behavior: 'smooth',
		});
	} catch(error) {
		if(el.scroll) {
			el.scroll(config.left, config.top);
		}
		return;
	}
}
