/// <reference types="cypress" />
import productCatalogPage, { viewSelector } from '../pages/productCatalog';
import testEnvironments from '../pages/testEnvironments';

const url = '/gridHackathonV2.html';

Object.entries(testEnvironments).forEach(([,view]) => {
	if (Cypress.browser.name != view.browser) return;
	const page = productCatalogPage(view, url);
	const viewDescription = `Browser: ${view.browser}, Viewport: ${view.width} x ${view.height}, Device: ${view.device}`;
	let task = 1;
	describe.skip('Cross-Device Elements', () => {
		before(page.before);
		beforeEach(page.beforeEach);
		Object.entries(page.display).forEach(([name, test]) => {
			it( `Task: ${task}, ` + 
				`Test Name: Display ${name} correctly in view, ` +
				`DOM selector: '${viewSelector[name]}', ${viewDescription}`, test);
		});
		Object.entries(page.hide).forEach(([name, test]) => {
			it( `Task: ${task}, ` + 
				`Test Name: Hide ${name} correctly in view, ` +
				`DOM selector: '${viewSelector[name]}', ${viewDescription}`, test);
		});

	});

	task = 2;
	describe.skip( 'Shopping Experience', () => {
		before(page.filter.before);
		beforeEach(page.filter.beforeEach);
		const test = page.filter.gridItems;
		it( `Task: ${task}, ` + 
			`Test Name: ${test.name}, ` +
			`DOM selector: '${test.selector}', ${viewDescription}`, test.test);
	});

	task = 3;
	describe( 'Product Details', () => {
		before(page.product.before);
		beforeEach(page.product.beforeEach);
		Object.entries(page.product).forEach(([key, test]) => {
			if ( key=='before' || key=='beforeEach' ) return;
			else if ( key=='fullPage' ) it.skip( `Task: ${task}, Test Name: ${test.name}, ${viewDescription}`, test.test);
			else it( `Task: ${task}, Test Name: ${test.name}, ${viewDescription}`, test.test);
		});
	});
});