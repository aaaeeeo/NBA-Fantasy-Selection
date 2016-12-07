var fs = require('fs');
var colors = require('colors');
var rq = require('request');
var ProgressBar = require('progress');
// fs.readFile('./allmember.json', 'utf8', function(err, allMember) {
// 	fs.readFile('./member.json', 'utf8', function(er, memberStr) {
// 		fs.readFile('./team.json', 'utf8', function(er, team) {
// 			var matchMember = JSON.parse(memberStr);
// 			//match(JSON.parse(allMember), matchMember.result.member_list, JSON.parse(team));
// 		});
// 	});
// });




function getData(room, team_user_token, cb) {
	console.log(room);
	var postForm = {
		"room_id": room,
		"team_id": 0,
		"TEAM_USER_TOKEN": team_user_token
	};
	ajax(postForm, cb);
}

function ajax(postForm, cb) {
	rq.post({
		url: 'http://ttnba.nbahero.com/room/memberList?post_time=1480859517188',
		form: postForm
	}, function(err, httpResponse, body) {
		rq.get('http://cdn.ttnba.nbahero.com/data/team.json?post_time=1480859517188', function(err2, response, body2) {
			rq.get('http://cdn.ttnba.nbahero.com/data/members.json?post_time=1480859517188', function(err3, reponse2, body3) {
				//console.log(err);
				//console.log(body,body2,body3);
				var memberStr = body;
				var allMember = body3;
				var team = body2;
				if(!('result' in JSON.parse(memberStr)))
					alert(JSON.parse(memberStr).message);
				var matchMember = JSON.parse(memberStr).result.member_list;
				match(JSON.parse(allMember), matchMember, JSON.parse(team),cb);
			});
		});
	});
}


function match(allMember, matchMember, team, cb) {
	console.log(allMember, matchMember, team);
	//console.log(member);
	// console.log('allMember', allMember['10001']);
	// console.log('memberMatch', matchMember['10001']);
	// console.log('team',team[matchMember['10001'].team_id]);
	var result = [];
	var count = 0;
	for (member in matchMember) {
		var pid = matchMember[member].id;
		var pobj = matchMember[member];
		//console.log(colors.green('NO. %s'), count);
		var player = {
			id: pid,
			player: allMember[pid].name,
			point: pobj.score,
			salary: pobj.salary,
			team: team[pobj.team_id].short_name,
			lastTen: pobj.last_ten_scores,
			xjb: (pobj.score / pobj.salary).toFixed(3),
			timeAvg: pobj.court_time_avg,
			position: pobj.position,
			nameEn: allMember[pid].e_name,
			status: pobj.state,
			img: allMember[pid].img,
			number: allMember[pid].number
		};
		result.push(player);
		// console.log(
		// 	'NO.',count
		// 	,'-->player: '.green,allMember[matchMember[member].id].name
		// 	,', point :',matchMember[member].score + ''.green
		// 	,', salary :'.red,matchMember[member].salary
		// 	,', team: ',team[matchMember[member].team_id].short_name);
		count++;
	}

	result.sort(function(a, b) {
		var keyA = a.xjb;
		var keyB = b.xjb;
		if (keyA < keyB) return 1;
		if (keyA > keyB) return -1;
		return 0;
	});
	cb(result);
	// for (p in result) {
	// 	cb()
	// 	console.log(JSON.stringify(result[p]));
	// }
}

exports.getData = getData;