 /// <reference types="@applitools/eyes-cypress" />

// const url = 'https://demo.applitools.com/gridHackathonV1.html'
const url = 'https://demo.applitools.com/gridHackathonV2.html'

describe('Display and hide appropriate elements in a variety of browsers and viewports', () => {
    it('Will display and hide appropriate elements', () => {
        cy.viewport(800, 600); // why are we doing this if viewports are set elsewhere?
        cy.visit(url);

        cy.eyesOpen({
            appName: "Applitools Hackathon 2020",
            testName: "Task 1",
        });
        
        cy.eyesCheckWindow({
            // not sure what "step name" refers to, so using tag.
            tag: "Cross-Device Elements Test",
            target: 'window',
            fully: true,
        });

        cy.eyesClose();
    });


});