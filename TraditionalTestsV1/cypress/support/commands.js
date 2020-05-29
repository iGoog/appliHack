// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
	failureThreshold: 0.00,
	failureThresholdType: 'percent',
	customDiffConfig: { threshold: 0.02 },
	capture: 'viewport',
	blur: 1
});
