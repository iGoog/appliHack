const browser = `${Cypress.browser.name}_v${Cypress.browser.majorVersion}`;
let views = require('../fixtures/tempView.json');
if (!views || views.length === 0) views = [
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

const url = '/gridHackathonV1.html';

let remaining = views.length;
const hiddenIdSet = new Set();
views.forEach((view) => {
	const sizeText = `${view.size[0]},${view.size[1]}`;
	describe(`Build all hide and display elements in ${browser} at ${sizeText}`, () => {
		beforeEach(()=> {
			// yuck! https://github.com/cypress-io/cypress/issues/1534
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
						if (v.showIds.length==0) {
							const idsToShow = new Set(hiddenIdSet);
							v.hideIds.forEach(id => idsToShow.delete(id));
							v.showIds = Array.from(idsToShow);
						}

					});

					console.log(JSON.stringify(views));
				}
				expect(view.hideIds.length).greaterThan(0);
			});
		});
		it (`Hides ids in ${browser} at ${sizeText}`, () => {
			// for (let i=0; i < view.hideIds.length; i++) {
			// 	cy.get('#'+CSS.escape(view.hideIds[i])).should('be.hidden');
			// }
			view.hideIds.forEach((hideId) => {
				cy.get('#'+CSS.escape(hideId)).should('be.hidden');
			});
		});

		it (`Shows ids in ${browser} at ${sizeText}`, () => {
			const fixedShowIds = [];
			let adjust = false;
			view.showIds.forEach((showId) => {
				if (Cypress.$('#'+CSS.escape(showId)+':visible').length===1) {
					fixedShowIds.push(showId);
					cy.get('#'+CSS.escape(showId)).should('be.visible');
				} else {
					adjust = true;
				}
			});
			if (adjust) {
				view.showIds = fixedShowIds;
				console.log(JSON.stringify(views));
			}
		});
	});
});

