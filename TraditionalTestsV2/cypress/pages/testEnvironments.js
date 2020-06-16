export const LAPTOP = 'Laptop';
export const TABLET = 'Tablet';
export const MOBILE = 'Mobile';
export const DEVICE = { LAPTOP, TABLET, MOBILE };

export const CHROME = 'chrome';
export const FIREFOX = 'firefox';
export const EDGE = 'edge';
export const BROWSER = { CHROME, FIREFOX, EDGE };

export const CHROME_LAPTOP = {
	width: 1200,
	height: 700,
	browser: CHROME,
	device: LAPTOP
};
export const FIREFOX_LAPTOP = {
	...CHROME_LAPTOP,
	browser: FIREFOX
};
export const EDGE_LAPTOP = {
	...CHROME_LAPTOP,
	browser: EDGE
};


export const CHROME_TABLET = {
	width: 768,
	height: 700,
	browser: CHROME,
	device: TABLET
};
export const FIREFOX_TABLET = {
	...CHROME_TABLET,
	browser: FIREFOX
};
export const EDGE_TABLET = {
	...CHROME_TABLET,
	browser: EDGE
};


export const CHOME_MOBILE = {
	width: 500,
	height: 700,
	browser: CHROME,
	device: MOBILE
};

export default {
	CHROME_LAPTOP, FIREFOX_LAPTOP, EDGE_LAPTOP, 
	CHROME_TABLET, FIREFOX_TABLET, EDGE_TABLET,
	CHOME_MOBILE
};