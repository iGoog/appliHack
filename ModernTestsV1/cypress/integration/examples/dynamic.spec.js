//const url = "https://htmlstream.com/front/html/landings/onepage-corporate.html";
//const url = "https://applitools.com/request-demo/";
//const url = "http://127.0.0.1:8080/gridHackathonV1.html";
//const url = "http://127.0.0.1:8080/gridHackathonV1.html";
const url = "http://127.0.0.1:8080/gridHackathonV2.html";
//const url = "https://demo.applitools.com/gridHackathonV2.html";
//const url = "https://getbootstrap.com/docs/4.4/examples/carousel/";

const browserCombo = [
  { width: 1200, height: 700, name: "chrome" },
  { width: 1200, height: 700, name: "safari" },
  { width: 1200, height: 700, name: "firefox" },
  { width: 1200, height: 700, name: "edge" },

  // { width: 768, height: 1024, name: "chrome" },
  // { width: 768, height: 1024, name: "safari" },
  // { width: 768, height: 1024, name: "firefox" },
  // { width: 768, height: 1024, name: "edge" },
  {
    deviceName: "iPhone X",
    screenOrientation: "portrait",
  }
];

const appName = " FilterBtnsCB";
const batchName = "CB";

function eyesCheck(params) {
  cy.eyesOpen({
    appName: appName,
    batchName: batchName,
    testName: params.testName,
    browser: browserCombo,
  });

  if (params.target != "region") {
    cy.eyesCheckWindow(params.testName);
  } else {
    cy.eyesCheckWindow({
      tag: params.testName,
      target: "region",
      selector: params.selector,
    });
  }

  cy.eyesClose();
}

describe("Cross-Browser Tests", () => {

  it(`test Layout`, function () {
    cy.visit(url);
    eyesCheck({ testName: this.test.title });
  });

 
});
