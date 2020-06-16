 /// <reference types="@applitools/eyes-cypress" />

// const url = 'https://demo.applitools.com/gridHackathonV1.html'
const url = 'https://demo.applitools.com/gridHackathonV2.html'

describe('Visit the page', () => {
    it('Load the page', () => {
        cy.viewport(800, 600); 
        cy.visit(url);

        cy.get('div.toolbox a.open_filters').first().click();
        cy.get('#colors__Black').click();
        cy.get('#filterBtn').click();
        cy.get('.grid_item figure a').first().click();
        cy.viewport(1200,600);


    });

});