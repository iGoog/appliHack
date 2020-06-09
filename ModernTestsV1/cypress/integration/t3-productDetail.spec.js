 /// <reference types="@applitools/eyes-cypress" />

const url = 'https://demo.applitools.com/gridHackathonV1.html'
// const url = 'https://demo.applitools.com/gridHackathonV2.html'

describe('Display and hide appropriate elements in a variety of browsers and viewports', () => {
    it('Will display and hide appropriate elements', () => {
        cy.viewport(800, 600);
        cy.visit(url);
        cy.get('div.toolbox a.open_filters').first().click();
        cy.get('#colors__Black').click();
        cy.get('#filterBtn').click();
        cy.get('.grid_item figure a').first().click();

        cy.eyesOpen({
            appName: "Applitools Hackathon 2020",
            testName: "Task 3",
        });
        
        cy.eyesCheckWindow({
            tag: "Product Details test",
            target: 'window',
            fully: true,
        });

        cy.eyesClose();
    });


});