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
//
// const buildViews = (url) => {
// 	const docPromises = [];
// 	const hiddenIdSet = new Set();
// 	let remaining = views.length;
// 	views.forEach((view) => {
// 		cy.viewport(view.size[0], view.size[1]);
// 		cy.visit(url);
// 		docPromises.push(cy.document().then(() => {
// 			view.hideIds = Cypress.$(':hidden').toArray()
// 				.filter(el => el.id != '' && 'script' != el.tagName.toLowerCase())
// 				.map( el => {
// 					hiddenIdSet.add(el.id);
// 					return el.id;
// 				} );
// 			if (--remaining==0) {
// 				views.forEach((view) => {
// 					view.showIds = new Set(hiddenIdSet);
// 					view.hideIds.forEach(id => view.showIds.delete(id));
// 					view.showIds = Array.from(view.showIds);
// 				});
//
// 				console.log(JSON.stringify(views));
// 			}
// 		}));
//
// 	});
// 	return Promise.allSettled(docPromises).then(results => {
// 		return views;
// 	});
// };

const url = '/gridHackathonV1.html';

let remaining = views.length;
const hiddenIdSet = new Set();
views.forEach((view) => {
	const sizeText = `${view.size[0]},${view.size[1]}`;
	describe(`Build all hide and display elements in ${browser} at ${sizeText}`, () => {
		beforeEach(()=> {
			cy.viewport(view.size[0], view.size[1]);
			cy.visit(url);
		});

		it( `will have hidden elements in ${browser} at ${sizeText}`, () => {
			cy.get('#page :visible > :hidden').then($hidden => {
				view.hideIds = $hidden.toArray()
					.filter(el => el.id != '' )
					.map( el => {
						hiddenIdSet.add(el.id);
						return el.id;
					} );
				if (--remaining===0) {
					views.forEach((v) => {
						v.showIds = new Set(hiddenIdSet);
						v.hideIds.forEach(id => v.showIds.delete(id));
						v.showIds = Array.from(v.showIds);
					});

					console.log(JSON.stringify(views));
				}
				expect(view.hideIds.length).greaterThan(0);
			});
		});
		it (`Hides ids in ${browser} at ${sizeText}`, () => {
			for (let i=0; i < view.hideIds.length; i++) {
				cy.get('#'+CSS.escape(view.hideIds[i])).should('be.hidden');
			}
			// view.hideIds.forEach((hideId) => {
			// 	cy.get('#'+CSS.escape(hideId)).should('be.hidden');
			// });
		});
	});
});

// it('builds views with visible and invisible ids', () => {
// 	const url = '/gridHackathonV1.html';
// 	buildViews(url).then(views=> {
// 		views.forEach(view => {
// 			expect(view.showIds).greaterThan(0);
// 		})
// 	});
//
//
// })
