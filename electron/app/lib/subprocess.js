const exec = require('child_process').exec;

// < $(fileStr)
function getData(numSalary, posArr, fileStr, cb) {
	var execArg = __dirname + '/draft-api ' + numSalary; 
	for(i in posArr)
		execArg += " " + posArr[i];
	console.log(execArg);
	var child = exec(execArg, (error, stdout, stderr) => {
		if (error) {
			console.log(error);
		}
		//console.log(stdout);console.log('stderr',stderr);
		cb(stdout.split('\n')[0]);
		
	});
	child.stdin.write(fileStr);
	child.stdin.end(); 
}

exports.calu = getData;

