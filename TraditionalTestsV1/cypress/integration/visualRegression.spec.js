const sizes = [
	[1200, 700],
	[768, 700],
	['iphone-x', 'landscape'],
];

describe('Visual regression tests', () => {
	const browser = `${Cypress.browser.name}_v${Cypress.browser.majorVersion}`;

	sizes.forEach((size) => {
		const sizeText = `${size[0]}_${size[1]}`;
		it(`Applifashion should match previous screenshot - ${sizeText} ${browser}`, () => {
			cy.viewport(size[0], size[1]);
			cy.visit('/gridHackathonV1.html');
			cy.window()
				.then((win) => {
					cy.document().then((doc) => { // we need the doc fully loaded.
						const viewHeight = win.innerHeight;
						const scrollHeight = doc.scrollingElement.scrollHeight;
						cy.matchImageSnapshot(
							`cross-device-elements_${sizeText}_${browser}`
						);
						for (let offset = viewHeight; offset < scrollHeight; offset += viewHeight) {
							cy.scrollTo(0, offset);
							cy.matchImageSnapshot(
								`cross-device-elements_${sizeText}_${browser}_offset_${offset}`
							);
						}
					});


				});

		});
	});
});
