// const exec = require('child_process').spawn;
// //const draftcpp = spawn('./draft-api', args);
// const execFileName = './draft-api';

// function getResult(fileName,args,cb) {
// 	execFileName = 'ls	';	
// 	//var draftCpp = spawn(execFileName, args);	'ls', ['-lh', '/usr']
// 	var draftCpp = spawn('./draft-api', [200, 0,0,0,0,0,'<re.json']);
// 	var result;
// 	draftCpp.stdout.on('data', (data) => {
// 		result +=data;
// 		//cb(result);
// 	});
// 	draftCpp.stderr.on('data', (data) => {
// 		//console.log(`stderr: ${data}`);
// 		//result = data;
// 	});
// 	draftCpp.on('close', (code) => {
// 		//console.log(`child process exited with code ${code}`);
// 		cb(result);
// 		return;
// 	});
// }

// function main(){
// 	getResult('ls',['-lh', '/usr'],function(re){
// 		console.log(re);	
// 	});

// }
// main();
var fs = require('fs');
var dir = require('path').basename(__dirname);

// const execFile = require('child_process').execFile;

// fs.readFile('./re.json', 'utf8', function(err, allMember) {

// 	const child = execFile('./draft-api', ['200', '0', '0', '0', '0', '0'] ,{stdio: allMember}, (error, stdout, stderr) => {
// 		if (error) {
// 			console.error(error);
// 		}
// 		console.log(stdout);
// 	});

// })


const exec = require('child_process').exec;

// < $(fileStr)
function getData(numSalary, num1, num2, num3, num4, num5, fileStr,cb) {
	console.log(numSalary, num1, num2, num3, num4, num5);
	var execArg = __dirname + '/draft-api ' + numSalary +' '+ num1 + ' '+ num2 + ' '+ num3 + ' ' + num4+ ' '+ num5 ; 	
	//console.log('sss',`/Users/fanbaolin/Documents/git/electron-quick-start/app/lib/draft-api $(numSalary) $(num1) $(num2) $(num3) $(num4) $(num5)`);
	//`/Users/fanbaolin/Documents/git/electron-quick-start/app/lib/draft-api $(numSalary) $(num1) $(num2) $(num3) $(num4) $(num5)`
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

function readFile(strIn,salary,num1,num2,num3,num4,num5,cb){
	console.log('filePath',salary,num1,num2,num3,num4,num5);
	// fs.readFile('/Users/fanbaolin/Documents/git/electron-quick-start/app/lib/re.json', 'utf8', function(err, allMember) {
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	//console.log(allMember.length);	
	// 	getData(200, 0, 0, 0, 0, 0,allMember,cb);
	// })
	// console.log(strin)
	getData(salary,num1,num2,num3,num4,num5,strIn,cb);
	
}

exports.calu = readFile;

