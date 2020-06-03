/// <reference types="cypress" />
const views = require('../fixtures/views.json');

const browser = `${Cypress.browser.name}_v${Cypress.browser.majorVersion}`;

describe( 'Should display specific elements at given resolutions', () => {
	const url = '/gridHackathonV1.html';
	// buildViews(url);
	views.forEach((view) => {
		if (view.browser != browser) return;
		const sizeText = `${view.size[0]},${view.size[1]}`;
		it(`Shows elements in ${browser} at ${sizeText}`, () => {
			cy.viewport(view.size[0], view.size[1]);
			cy.visit(url);
			view.showIds.forEach((showId) => {
				cy.get('#'+CSS.escape(showId)).should('be.visible');
				// expect(.to.be.visible;
			})
		});
		it(`Hides elements in ${browser} at ${sizeText}`, () => {
			cy.viewport(view.size[0], view.size[1]);
			cy.visit(url);
			view.hideIds.forEach((hideId) => {
				cy.get('#'+CSS.escape(hideId)).should('be.hidden');
			})
		});

	});








});
