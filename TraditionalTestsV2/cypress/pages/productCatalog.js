/// <reference types="cypress" />
import { DEVICE as device } from './testEnvironments';


export const displayCheck = (env) => { 
	return {
		heart: () => (env.device === device.LAPTOP),
		filters: () => (env.device !== device.LAPTOP),
		viewGrid: () => (env.device === device.LAPTOP),
		viewList: () => (env.device === device.LAPTOP),
		itemActionIcons: () => (env.device !== device.LAPTOP),
		searchInput: () => (env.device !== device.MOBILE),
		cartCount: () => (env.device !== device.MOBILE),
		quickLinks: () => (env.device !== device.MOBILE)
	};
};

// these are still rather brittle, and would better be served by [data.test] attribute selectors in dev
export const viewSelector = {
	heart: '.top_tools a.wishlist',
	filters: 'div.toolbox a.open_filters',
	viewGrid: 'div.toolbox i.ti-view-grid',
	viewList: 'div.toolbox i.ti-view-list',
	itemActionIcons: '#product_grid .grid_item li a.tooltip-1',
	searchInput: 'div.main_nav div.custom-search-input',
	cartCount: 'div.main_nav ul.top_tools a.cart_bt strong',
	quickLinks: '#collapse_1'
};

export const filterSelector = {
	productItems: '#product_grid .grid_item'
};



const testFactory = (name, test, selector) => { return {name, test, selector }; };

const gridHackathonPage = (env, url) => {
	const tests = { display: {}, hide: {}, filter: {}, product: {}};
	tests.before = () => cy.visit(url);

	// viewport might better be placed in the descrive statement
	// ie: describe('title, {viewportHeight: height, viewportWidth: width}, ()=>{...})
	// https://github.com/cypress-io/cypress/issues/1534#issuecomment-617564195
	// currently in develop branch of cypress
	tests.beforeEach = () => cy.viewport(env.width, env.height);

	const shouldDisplay = displayCheck(env);
	Object.entries(viewSelector).forEach( ([view, selector]) => {
		if (shouldDisplay[view]()) tests.display[view] = () => cy.get(selector).should( 'be.visible');
		else tests.hide[view] = () => cy.get(selector).should( 'not.be.visible');
	});

	tests.filter.before = () => {
		cy.viewport(800, 600);
		cy.visit(url);
		cy.get('div.toolbox a.open_filters').click();
		cy.get('#colors__Black').click();
		cy.get('#filterBtn').click();
	};
	tests.filter.beforeEach = tests.beforeEach;
	tests.filter.gridItems = 
		testFactory(
			'Black filter should show only two items',
			() => cy.get(filterSelector.productItems).should('have.length', 2),
			filterSelector.productItems
		);

	// could just test this as a separate page by visiting the url...
	tests.product.before = () => {
		cy.viewport(800, 600);
		cy.visit(url);
		cy.get('div.toolbox a.open_filters').first().click();
		cy.get('#colors__Black').click();
		cy.get('#filterBtn').click();
		cy.get('.grid_item figure a').first().click();
	};
	tests.product.beforeEach = tests.beforeEach;

	// Leaving this code section commented out as an example of 
	// a failed approach to screenshotting selected DOM elements.
	// I experienced both Cypress bugs and shortcomings trying this approach.
	// An alternative approach for this visual regression testing
	// is to screenshot the whole page, then to calculate clippings of
	// problem areas when using Cypress. Applitools replicates the
	// same kind of workflow, except it actually finds the problem areas
	// for you and the AI is dramatically better at finding actual
	// differences over the pixel comparison
	/* 
	const productSelector = {
		topTools: 'ul.top_tools',
		shoeImage: '#shoe_img',
		ratingCount: '.rating',
		sizeSelectDefault: '.prod_options div.nice-select span.current',
		newPrice: '#new_price',
		sku: 'div.prod_info p small',
		// addToCardButton: 'div.btn_add_to_cart'
	};

	// ran into weird negative index out of range issue with chrome 1200 width viewport seemingly related issue to this:
	// https://github.com/cypress-io/cypress/issues/2034
	// cy.get(productSelector.shoeImage).sceenshot() or cy.get(productSelector.shoeImage).matchImageSnapshot()
	// working around this by passing clip information directly.
	// unfortunately, this still does a poor job of selecting the correct elements.
	const clipWorkaround = ($el) => {
		const rect =  $el[0].getBoundingClientRect();
		const extraPad = 10;
		const opts = {clip: {x : rect.x-extraPad, y: rect.y-extraPad, width: rect.width + 2*extraPad, height: rect.height + 2*extraPad} };
		console.log(`id: ${$el[0].id}; scrolly: ${window.scrollY}; opts ${JSON.stringify(opts)}; rect: ${JSON.stringify(rect)} `);
		cy.matchImageSnapshot(opts);
	};


	Object.entries(productSelector).forEach( ([name, selector]) => {
		tests.product[name] = testFactory(`Visual regression test on ${name}`, () => cy.get(selector).then(clipWorkaround), selector );
	});

	*/


	tests.product.fullPage =  testFactory('Visual regression test on page', () => cy.matchImageSnapshot({capture: 'fullPage'}), 'fullPage capture' );

	return tests;
	
};


export default gridHackathonPage;