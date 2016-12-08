var rq = require('request');

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
	//console.log(allMember, matchMember, team);
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
}

exports.getData = getData;