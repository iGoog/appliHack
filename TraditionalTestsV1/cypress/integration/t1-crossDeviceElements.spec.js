/// <reference types="cypress" />
const views = require('../fixtures/views.json');
const browser = `${Cypress.browser.name}_v${Cypress.browser.majorVersion}`;
const url = '/gridHackathonV1.html';
const task = 1;

// no clear way to pass params to reporters outside of title, so put everything into title
// see ../reporters/hackathonReporter.js
const reportHack = (fakeTestName, domId, viewport, device) => {
	return  `Task: ${task}, Test Name: ${fakeTestName}, DOM Id: ${domId}, Browser: ${browser}, Viewport: ${viewport}, Device: ${device}`;
};

views.forEach((view) => {
	if (view.browser != browser) return;
	const sizeText = `${view.size[0]},${view.size[1]}`;
	describe( `Display and hide appropriate elements in ${browser} at ${sizeText}`, () => {
		before(()=> {
			cy.viewport(view.size[0], view.size[1]);
			cy.visit(url);
		});
		beforeEach(() => {
			// ideally, this would not happen here or before, but in describe 
			// ie: describe('title, {viewportHeight: height, viewportWidth: width}, ()=>{...})
			// https://github.com/cypress-io/cypress/issues/1534#issuecomment-617564195
			// this approach currently on develop branch of cypress
			cy.viewport(view.size[0], view.size[1]);
		});
		view.showIds.forEach((showId) => {
			it (reportHack(`#${CSS.escape(showId)} is visible`, showId, sizeText, view.device), () => {
				cy.get('#'+CSS.escape(showId)).should('be.visible');
			});
		});
		view.hideIds.forEach((hideId) => {
			it (reportHack(`#${CSS.escape(hideId)} is hidden`, hideId, sizeText, view.device), () => {
				cy.get('#'+CSS.escape(hideId)).should('be.hidden');
			});
		});

	});

});
