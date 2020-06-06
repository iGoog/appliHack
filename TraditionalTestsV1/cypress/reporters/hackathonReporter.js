const fs = require('fs');
const getLogFile = () => 'hackathonReportLog';

module.exports = hackathonReporter;
function hackathonReporter(runner, options) {
	console.log('reporter options');
	console.log(JSON.stringify(options));
	runner.on('pass', (test) => {
		console.log(test.title + ', Status: Pass');
		fs.appendFileSync( getLogFile(), test.title + ', Status: Pass\n');
	});
	runner.on('fail', (test) => {
		console.log(test.title + ', Status: Fail');
		fs.appendFileSync( getLogFile(), test.title + ', Status: Fail\n');
	});

}