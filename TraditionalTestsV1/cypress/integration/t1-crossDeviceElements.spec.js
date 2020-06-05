/// <reference types="cypress" />
const views = require('../fixtures/views.json');
const browser = `${Cypress.browser.name}_v${Cypress.browser.majorVersion}`;
const url = '/gridHackathonV1.html';

views.forEach((view) => {
	if (view.browser != browser) return;
	const sizeText = `${view.size[0]},${view.size[1]}`;
	describe( `Display and hide appropriate elements in ${browser} at ${sizeText}`, () => {
		before(()=> {
			cy.viewport(view.size[0], view.size[1]);
			cy.visit(url);
		});
		beforeEach(() => {
			cy.viewport(view.size[0], view.size[1]);
		});
		view.showIds.forEach((showId) => {
			it (`Displays #${CSS.escape(showId)} in ${browser} at ${sizeText}`, () => {
				cy.get('#'+CSS.escape(showId)).should('be.visible');
			});
		});
		view.hideIds.forEach((hideId) => {
			it (`Hides #${CSS.escape(hideId)} in ${browser} at ${sizeText}`, () => {
				cy.get('#'+CSS.escape(hideId)).should('be.hidden');
			});
		});

	});

});
