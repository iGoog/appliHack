/// <reference types="cypress" />
import productCatalogPage, { viewSelector } from '../pages/productCatalog';
import testEnvironments from '../pages/testEnvironments';

const url = '/gridHackathonV2.html';

Object.entries(testEnvironments).forEach(([,view]) => {
	if (Cypress.browser.name != view.browser) return;
	const page = productCatalogPage(view, url);
	const viewDescription = `Browser: ${view.browser}, Viewport: ${view.width} x ${view.height}, Device: ${view.device}`;
	let task = 1;
	describe(`Cross-Device Elements Tests in ${viewDescription}`, () => {
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
	describe( `Shopping Experience Tests in ${view.browser} at ${view.width}x${view.height}`, () => {
		before(page.filter.before);
		beforeEach(page.filter.beforeEach);
		const test = page.filter.gridItems;
		it( `Task: ${task}, ` + 
			`Test Name: ${test.name}, ` +
			`DOM selector: '${test.selector}', ${viewDescription}`, test.test);
	});

	task = 3;
	describe( `Product Details Tests in ${view.browser} at ${view.width}x${view.height}`, () => {
		before(page.product.before);
		beforeEach(page.product.beforeEach);
		Object.entries(page.product).forEach(([key, test]) => {
			if (key.startsWith('before')) return;
			it( `Task: ${task}, ` + 
				`Test Name: ${test.name}, ${viewDescription}`, test.test);
		});
	});
});