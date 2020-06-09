 /// <reference types="@applitools/eyes-cypress" />

// const url = 'https://demo.applitools.com/gridHackathonV1.html'
const url = 'https://demo.applitools.com/gridHackathonV2.html'

describe('Display and hide appropriate elements in a variety of browsers and viewports', () => {
    it('Will display and hide appropriate elements', () => {
        cy.viewport(800, 600); 
        cy.visit(url);

        cy.get('div.toolbox a.open_filters').click();
        cy.get('#colors__Black').click();
        cy.get('#filterBtn').click();

        cy.eyesOpen({
            appName: "Applitools Hackathon 2020",
            testName: "Task 2",
        });
        
        cy.eyesCheckWindow({
            tag: "Filter Results",
            target: 'region',
            selector: '#product_grid',
        });

        cy.eyesClose();
    });

});