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

	const productDomSelector = {
		// topTools: 'ul.top_tools', // this selector does a poor job of screenshots.
		// shoeImage: '#shoe_img', // this selector keeps moving vertically
		ratingCount: '.rating',
		sizeSelectDefault: '.prod_options div.nice-select span.current',
		newPrice: '#new_price',
		sku: 'div.prod_info p small',
		// addToCardButton: 'div.btn_add_to_cart'  // the issue with this one is placement
	};

	// ran into weird negative index out of range issue with chrome 1200 width viewport seemingly related issue to this:
	// https://github.com/cypress-io/cypress/issues/2034
	// cy.get(productDomSelector.shoeImage).sceenshot() or cy.get(productDomSelector.shoeImage).matchImageSnapshot()
	// working around this by passing clip information directly.
	// unfortunately, this still does a poor job of selecting the correct elements.
	// some elements seem to also sort of "move" where they are rendered on the page.
	// ie: if I run in windowed on an unchanged page, sometimes the captured element has an height offset from the iniital run
	// this seems avoidable by using headless runs.
	const clipWorkaround = ($el) => {
		const rect =  $el[0].getBoundingClientRect();
		const extraPad = 2;
		const opts = {clip: {x : rect.x-extraPad, y: rect.y-extraPad, width: rect.width + 2*extraPad, height: rect.height + 2*extraPad} };
		// console.log(`id: ${$el[0].id}; scrolly: ${window.scrollY}; opts ${JSON.stringify(opts)}; rect: ${JSON.stringify(rect)} `);
		cy.matchImageSnapshot(opts);
	};


	Object.entries(productDomSelector).forEach( ([name, selector]) => {
		tests.product[name] = testFactory(`Visual regression test on ${name}`, () => cy.get(selector).then(clipWorkaround), selector );
	});


	

	// manual clipping can be attained by using fullpage screenshot 
	// then analyzing in a graphical editor. I used a rectangle select in GIMP
	// and then copied the position and size information.
	// unfotunately, even these seem to suffer from offset issues.
	// arguably, most of these issues could be accurately tested 
	// if the visual comparsion tool was able to account for these differences.
	const manualClipping = {};
	manualClipping[device.LAPTOP] = {
		addToCardButton: { clip: { x: 1002, y: 742, width: 192, height: 72 } },
		topTools: { clip: { x: 1052, y: 74, width: 142, height: 48 } },
		shoeImage: { clip: { x: 222, y: 222, width: 748, height: 358 } },

	};
	manualClipping[device.TABLET] = {
		addToCardButton: { clip: { x: 609, y: 866, width: 146, height: 73 } },
		topTools: { clip: { x: 627, y: 54, width: 131, height: 51 } },
		shoeImage: { clip: { x: 18, y: 203, width: 729, height: 346 } },
	};
	manualClipping[device.MOBILE] = {
		addToCardButton: { clip: { x: 351, y: 864, width: 135, height: 60 } },
		topTools: { clip: { x: 360, y: 54, width: 131, height: 42 } },
		shoeImage: { clip: { x: 29, y: 243, width: 451, height: 263 } },
	};
	Object.entries(manualClipping[env.device]).forEach( ([name, opts]) => {
		tests.product[name] = testFactory(`Manually clipped visual test on ${name}`, () => cy.matchImageSnapshot(opts), JSON.stringify(opts.clip) );
	});


	tests.product.fullPage =  testFactory('Visual regression test on page', () => cy.matchImageSnapshot({capture: 'fullPage'}), 'fullPage capture' );

	return tests;
	
};


export default gridHackathonPage;