var calu = require('./subprocess');
var getData = require('./index');
getData.getData(function(res) {
		var resStr = JSON.stringify(res);

		calu.calu(resStr.substring(1,resStr.length-1), function(re) {
		var reArr = re.split(',');
		//console.log(reArr);
		for(var i in reArr){
			if(reArr[i] != ''){
				var picked = res.find(o => o.id === reArr[i]);
				console.log(JSON.stringify(picked));
			}else{
				continue;
			}
		}
	})
})