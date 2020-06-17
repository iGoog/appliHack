# Applitools Cross Browser Testing [Hackathon](https://applitools.com/cross-browser-testing-hackathon-v20-1-instructions/)

This project has code for end-to-end testing of an [example website, AppliFashion,](https://demo.applitools.com/gridHackathonV1.html) that supports a variety of browsers and devices through a responsive design while it [undergoes a change.](https://demo.applitools.com/gridHackathonV2.html) 

The modern tests with Applitools make it incredibly easy to discover and test changes across browsers and viewports. One tests with the Applitools AI by using its "eyes". The eyes "open", then "check" a portion or portions of the page, and then "close". This information is processed by the visual AI online, which spots differences. The Applitools website makes it easy to track and report on these differences by letting you select marked areas and even post issues to github.

After working around some [issues](https://github.com/cypress-io/cypress/issues/1534#issuecomment-417652182), "traditional" tests with Cypress are able to replicate many of the cross browser tests well. The website changes were not built with this kind of testing in mind and lack [non-brittle [data.test] attributes](https://docs.cypress.io/guides/references/best-practices.html#Selecting-Elements) to programatically work with, but I was able to make the appropriate tests work with CSS selectors. Tests would work well in testing focused development, though they did not make it simple to discover new issues. I set up a bit of a messy [page object](https://martinfowler.com/bliki/PageObject.html) for testing in this scenario, but a team could also benefit from building out [app actions](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/) as part of the development process.

While testing displayed elements worked well, the tests completely fell apart for testing render and layout issues in the "Product Detail" tests. You can see some basic usage of the [cypress-image-snapshot](https://github.com/palmerhq/cypress-image-snapshot) package as an attempt to address these tests. There was an unusual issue related to the [cy.screenshot()](https://github.com/cypress-io/cypress/issues/2034). Unfortunately, even after working around this, the screenshots were both slow and flaky when capturing based elements chosen with selectors. I also attempted to do [manual clipping on the visualFail branch](https://github.com/iGoog/appliHack/blob/visualFail/TraditionalTestsV2/cypress/pages/productCatalog.js) of this project. While I think it would be possible to improve the screenshot comparison functionality in these projects, Applitools demonstrates its strength in not only getting the comparisons right, but making it easy to work with.

## Instructions

0. Set up your environment. Install [npm](https://www.npmjs.com/get-npm), [git](https://git-scm.com/downloads), [chrome](https://www.google.com/chrome/), [edge-chromium*](https://www.microsoft.com/en-us/edge), [firefox](https://www.mozilla.org/en-US/firefox/new/). Get an [Applitools account](https://applitools.com/). You probably want [Visual Studio Code](https://code.visualstudio.com/) too.
	* In Linux, you will need to remove running test:edge in the "test" npm script in package.json for the traditional packages as there is no Edge version for Linux.
	* In Windows, you can run [bash in Visual Studio Code](https://code.visualstudio.com/docs/editor/integrated-terminal).
1. Clone project.
    ```bash
	git clone https://github.com/iGoog/appliHack.git
	```
2. Try each different test package:
	1. Modern Tests with [Applitools](https://applitools.com/) (ModernTestsV1 or ModernTestsV2)
	   * Setup Applitools API key with environment variables:
			```bash
			#linux/mac/bash
			export APPLITOOLS_API_KEY=<your_key>
			```
		* Install dependencies, & test.
			```bash
			cd ModernTestsV2
			npm install
			npx eyes-setup
			# task 1
			npm run t1
			# task 2
			npm run t2
			# task 3
			npm run t3
			# you could alternatively cypress and run tests in cypress with: 
			# npm run cypress:open
			```
		* Review results on [Applitools website](https://applitools.com/).
	2. Traditional Tests with [Cypress](https://www.cypress.io/) (TraditionalTestsV1 or TraditionalTestsV2)
		* Install dependencies.
			```bash
			cd TraditionalTestsV2
			npm install
			```
		* Option 1: Run tests in cypress runner:
			```bash
			npm run cy:open
			```
		* Visually review all tests inside of cypress.
		* Option 2: Run tests in the command line (this generates the needed report file):
			```bash
			npm run test
			```
		* Review output in hackathonReportLog file.

