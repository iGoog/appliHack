const fs = require('fs');
const getLogFile = () => 'hackathonReportLog';

module.exports = hackathonReporter;
function hackathonReporter(runner) {
	runner.on('pass', (test) => {
		fs.appendFileSync( getLogFile(), test.title + ', Status: Pass\n');
	});
	runner.on('fail', (test) => {
		console.log(test.title + ', Status: Fail');
		fs.appendFileSync( getLogFile(), test.title + ', Status: Fail\n');
	});

}