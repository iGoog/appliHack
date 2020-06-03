const browser = `${Cypress.browser.name}_v${Cypress.browser.majorVersion}`;
const views = [
	{   size : [1200, 700],
		showIds: [],
		hideIds: [],
		browser
	}, {   size : [768, 700],
		showIds: [],
		hideIds: [],
		browser
	}, {   size : [500,700], // these are different... ['iphone-x', 'landscape'],
		showIds: [],
		hideIds: [],
		browser
	},
];

const buildViews = (url) => {
	const docPromises = [];
	const hiddenIdSet = new Set();
	let remaining = views.length;
	views.forEach((view) => {
		cy.viewport(view.size[0], view.size[1]);
		cy.visit(url);
		docPromises.push(cy.document().then(() => {
			view.hideIds = Cypress.$(':hidden').toArray()
				.filter(el => el.id != '' && 'script' != el.tagName.toLowerCase())
				.map( el => {
					hiddenIdSet.add(el.id);
					return el.id;
				} );
			if (--remaining==0) {
				views.forEach((view) => {
					view.showIds = new Set(hiddenIdSet);
					view.hideIds.forEach(id => view.showIds.delete(id));
					view.showIds = Array.from(view.showIds);
				});

				console.log(JSON.stringify(views));
			}
		}));

	});
	return Promise.allSettled(docPromises).then(results => {
		return views;
	});
};

export default buildViews;
