window.$ = window.jQuery = require('jquery');
var allMember = require('../lib/index').getData;
var calu = require('../lib/subprocess');
// allMember(function(re) {
// 	//console.log(re);
// 	calu.calu(resStr.substring(1, resStr.length - 1), function(re) {
// 		var reArr = re.split(',');
// 		//console.log(reArr);
// 		for (var i in reArr) {
// 			if (reArr[i] != '') {
// 				var picked = res.find(o => o.id === reArr[i]);
// 				//console.log(JSON.stringify(picked));
// 			} else {
// 				continue;
// 			}
// 		}
// 	})
// });

// function refreshTable(re) {
// 	document.getElementById('result');
// 	re.foreach(function(re) {

// 	})
// }
angular.module('myModule', ['ui.select', 'ngSanitize']);
var app = angular.module('myApp', []);

app.controller('ResultCtrl', ResultCtrl);
app.controller('SelectCtrl', SelectCtrl);

//$('select').select2();

function ResultCtrl($scope, $http) {
	$scope.room = [];
	$scope.selectedArr = {
		'playerChoose': []
	};
	$scope.status_text = "界面初始化完成";
	$scope.roomStr = "选择房间号：";
	$scope.playerHave = "选择固定球员";
	$scope.playerNotHave= "选择删除球员";
	$scope.playerPostion = ['PG', 'SG', 'SF', 'PF', 'C'];

	$scope.reset = function() {
		$scope.num_type = 0;
		$scope.people = [];
		$scope.allPlayer = [];
		$scope.allPlayerP = [];
		$scope.allPlayerP1 = [];
		$scope.allPlayerP2 = [];
		$scope.allPlayerP3 = [];
		$scope.allPlayerP4 = [];
		$scope.allPlayerP5 = [];
		$scope.allPlayerWithPosition = [];
		$scope.player = {
			'playerSelectedYes' : [],
			'playerSelectedNo' : [],
			'playerSelectedYesIdArr' : [],
			'playerSelectedNoIdArr' : []
		}
	}

	$scope.addSelectedPlayer = function(type,model) {
		$scope.player[type] = [];
		$scope.player[type+'IdArr'] = model;
		for(var i in model){
			var picked = $scope.allPlayer.find(o => o.id === model[i]);
			$scope.player[type].push(picked);	
		}
		console.log($scope.player[type]);

	}

	$scope.getUserToken = function() {
		$scope.status_text = "获取User Token中...";
		var httpRequest = $http({
			method: 'POST',
			url: 'http://ttnba.nbahero.com/platform/login',
			data: {
				"user_account": "sys581425e8435105.58583237@dsucsys.com",
				"password": "581425e843bc2",
				"timestamp": 1479915563,
				"sign": '32ca30c0c20957c7b005f12081dabba2'
			}

		}).then(function successCallback(response) {
			if(!('result' in response.data))
				alert(response.status+" "+response.statusText+"\n"+response.data.message);
		    var user_token = response.data.result.user_token;
			console.log(user_token);
			$scope.getTeamUserToken(user_token);
		  }, function errorCallback(response) {
		    alert(response.status+" "+response.statusText);
		  });
	}

	$scope.getTeamUserToken = function(user_token) {
		$scope.status_text = "获取Team User Token中...";
		var httpRequest = $http({
			method: 'POST',
			url: 'http://ttnba.nbahero.com/platform/getUserInfo',
			data: {
				"user_token": user_token,
				"source": "dsty",
				"type": "web",
				"channel": 'dsty'
			}

		}).then(function successCallback(response) {
			if(!('result' in response.data))
				alert(response.status+" "+response.statusText+"\n"+response.data.message);
		    var team_user_token = response.data.result.TEAM_USER_TOKEN;
			console.log(team_user_token);
			$scope.team_user_token = team_user_token;
			$scope.selectRoom(team_user_token);
		  }, function errorCallback(response) {
		    alert(response.status+" "+response.statusText);
		  });
	}

	$scope.selectRoom = function(team_user_token) {
		$scope.status_text = "获取房间列表中...";
		var httpRequest = $http({
			method: 'GET',
			url: 'http://ttnba.nbahero.com/room/publicRoomList',
			params: {
				"type": "",
				"TEAM_USER_TOKEN": team_user_token,
				"last_room_id":0,
				"page_count":1000,
				"type":'',
				"version":"2.0.2"
			}

		}).then(function(response, status) {
			if(!('result' in response.data))
				alert(response.status+" "+response.statusText+"\n"+response.data.message);
			$scope.room = response.data.result.list;
			console.log($scope.room.length);
			console.log($scope.room);
			$scope.selectedArr['room'] = $scope.room[0].id;
			$scope.status_text = "完成";
			//$('select').select2();
		});
	}

	$scope.selectPlayer = function(room,cb) {
		console.log('room', room.id);
		$scope.status_text = "获取球员列表中...";
		$scope.num_type = parseInt(room.num_type)
		allMember(room.id, $scope.team_user_token, function(re) {
			console.log(re);
			//console.log(re);
			var reArr = [
				[], $scope.allPlayerP1, $scope.allPlayerP2, $scope.allPlayerP3, $scope.allPlayerP4, $scope.allPlayerP5
			];
			for (var i in re) {
				reArr[parseInt(re[i].position)].push(re[i]);
			}
			reArr.shift();
			$scope.allPlayerWithPosition = reArr;
			$scope.$apply(function() {
				$scope.allPlayer = re;
				$scope.status_text = "完成";
			});
			cb();
			//console.log(reArr);
		});
	}

	$scope.changedValue = function(type, value) {
		//console.log('111', type, value);
		$scope.reset();
		$scope.selectedArr[type] = JSON.parse(value);
		if (type == 'playerChoose') {
			$scope.selectedArr[type].push(value);
		}
		//console.log($scope.selectedArr.type);
		$scope.refresh();
	}

	$scope.refresh = function() {
		$scope.selectPlayer($scope.selectedArr['room'],function(){
			//$scope.getResult();
			return;
		});
		
	}


	$scope.getResult = function() {
		$scope.status_text = "计算选择方案中...";
		var resStr = '';
		//console.log($scope.player.playerSelectedNoIdArr);
		var allSalary = 0;
		var positionArr = [];
		$scope.people = [];
		if($scope.num_type==1) {
			allSalary = 125;
			positionArr = [1,1,1,1,1,0,0,0];
		}
		else {
			allSalary = 200;
			positionArr = [1,1,1,1,1,1,1,1];
		}
		for (var p in $scope.allPlayer) {
			// console.log($scope.allPlayer[p]);
			if ($scope.player.playerSelectedNoIdArr.indexOf($scope.allPlayer[p].id) >= 0) {
				//console.log('true', $scope.allPlayer[p]);
				continue;
			}
			if ($scope.player.playerSelectedYesIdArr.indexOf($scope.allPlayer[p].id) >= 0) {
				var picked = $scope.allPlayer[p];
				picked.positionEn = $scope.playerPostion[parseInt(picked.position) - 1];
				allSalary -= picked.salary;
				var pos = parseInt(picked.position)-1;
				var sup_pos = (pos == 0 || pos == 1 ? 5 : pos == 2 || pos == 3 ? 6 : -1);
				//console.log(pos+" "+sup_pos);
				if (positionArr[pos] > 0) {
					positionArr[pos]--;
					$scope.people.push(picked);
				}
				else if (sup_pos != -1 && positionArr[sup_pos] > 0) {
					positionArr[sup_pos]--;
					$scope.people.push(picked);
				}
				else if (positionArr[7] > 0) {
					positionArr[7]--;
					$scope.people.push(picked);
				}
				continue;
			}


			resStr += JSON.stringify($scope.allPlayer[p]) + '\n';
		}
		//console.log('resStr::', resStr);
		//$scope.people = [];
		calu.calu(allSalary, positionArr, resStr, function(re) {
			var reArr = re.split(',');
			//console.log(reArr);
			for (var i in reArr) {
				if (reArr[i] != '') {
					var picked = $scope.allPlayer.find(o => o.id === reArr[i]);
					//console.log(picked);
					picked.positionEn = $scope.playerPostion[parseInt(picked.position) - 1];
					$scope.people.push(picked);
					//= JSON.stringify(picked);
				} else {
					continue;
				}
			}

			$scope.$apply(function() {
				$scope.people = $scope.people;
				$scope.status_text = "完成";
			});
			//console.log('$scope.people', $scope.people);
			return;
		});
	}

	$scope.getUserToken();

	$scope.search = function(){
		$scope.getResult();
	}

	//$scope.selectPlayer($scope.room[0].id);
	//console.log($scope.room);
}

function SelectCtrl() {

}