//window.$ = window.jQuery = require('jquery');
var allMember = require('../lib/index').getData;
var calu = require('../lib/subprocess');
const storage = require('electron-json-storage');
window.md5=function(r){function n(r,n){return r<<n|r>>>32-n}function t(r,n){var t,o,e,u,f;return e=2147483648&r,u=2147483648&n,t=1073741824&r,o=1073741824&n,f=(1073741823&r)+(1073741823&n),t&o?2147483648^f^e^u:t|o?1073741824&f?3221225472^f^e^u:1073741824^f^e^u:f^e^u}function o(r,n,t){return r&n|~r&t}function e(r,n,t){return r&t|n&~t}function u(r,n,t){return r^n^t}function f(r,n,t){return n^(r|~t)}function i(r,e,u,f,i,a,c){return r=t(r,t(t(o(e,u,f),i),c)),t(n(r,a),e)}function a(r,o,u,f,i,a,c){return r=t(r,t(t(e(o,u,f),i),c)),t(n(r,a),o)}function c(r,o,e,f,i,a,c){return r=t(r,t(t(u(o,e,f),i),c)),t(n(r,a),o)}function C(r,o,e,u,i,a,c){return r=t(r,t(t(f(o,e,u),i),c)),t(n(r,a),o)}function g(r){for(var n,t=r.length,o=t+8,e=(o-o%64)/64,u=16*(e+1),f=Array(u-1),i=0,a=0;t>a;)n=(a-a%4)/4,i=a%4*8,f[n]=f[n]|r.charCodeAt(a)<<i,a++;return n=(a-a%4)/4,i=a%4*8,f[n]=f[n]|128<<i,f[u-2]=t<<3,f[u-1]=t>>>29,f}function h(r){var n,t,o="",e="";for(t=0;3>=t;t++)n=r>>>8*t&255,e="0"+n.toString(16),o+=e.substr(e.length-2,2);return o}function d(r){r=r.replace(/\r\n/g,"\n");for(var n="",t=0;t<r.length;t++){var o=r.charCodeAt(t);128>o?n+=String.fromCharCode(o):o>127&&2048>o?(n+=String.fromCharCode(o>>6|192),n+=String.fromCharCode(63&o|128)):(n+=String.fromCharCode(o>>12|224),n+=String.fromCharCode(o>>6&63|128),n+=String.fromCharCode(63&o|128))}return n}var m,v,S,l,A,s,w,y,b,p=Array(),L=7,j=12,k=17,q=22,x=5,z=9,B=14,D=20,E=4,F=11,G=16,H=23,I=6,J=10,K=15,M=21;for(r=d(r),p=g(r),s=1732584193,w=4023233417,y=2562383102,b=271733878,m=0;m<p.length;m+=16)v=s,S=w,l=y,A=b,s=i(s,w,y,b,p[m+0],L,3614090360),b=i(b,s,w,y,p[m+1],j,3905402710),y=i(y,b,s,w,p[m+2],k,606105819),w=i(w,y,b,s,p[m+3],q,3250441966),s=i(s,w,y,b,p[m+4],L,4118548399),b=i(b,s,w,y,p[m+5],j,1200080426),y=i(y,b,s,w,p[m+6],k,2821735955),w=i(w,y,b,s,p[m+7],q,4249261313),s=i(s,w,y,b,p[m+8],L,1770035416),b=i(b,s,w,y,p[m+9],j,2336552879),y=i(y,b,s,w,p[m+10],k,4294925233),w=i(w,y,b,s,p[m+11],q,2304563134),s=i(s,w,y,b,p[m+12],L,1804603682),b=i(b,s,w,y,p[m+13],j,4254626195),y=i(y,b,s,w,p[m+14],k,2792965006),w=i(w,y,b,s,p[m+15],q,1236535329),s=a(s,w,y,b,p[m+1],x,4129170786),b=a(b,s,w,y,p[m+6],z,3225465664),y=a(y,b,s,w,p[m+11],B,643717713),w=a(w,y,b,s,p[m+0],D,3921069994),s=a(s,w,y,b,p[m+5],x,3593408605),b=a(b,s,w,y,p[m+10],z,38016083),y=a(y,b,s,w,p[m+15],B,3634488961),w=a(w,y,b,s,p[m+4],D,3889429448),s=a(s,w,y,b,p[m+9],x,568446438),b=a(b,s,w,y,p[m+14],z,3275163606),y=a(y,b,s,w,p[m+3],B,4107603335),w=a(w,y,b,s,p[m+8],D,1163531501),s=a(s,w,y,b,p[m+13],x,2850285829),b=a(b,s,w,y,p[m+2],z,4243563512),y=a(y,b,s,w,p[m+7],B,1735328473),w=a(w,y,b,s,p[m+12],D,2368359562),s=c(s,w,y,b,p[m+5],E,4294588738),b=c(b,s,w,y,p[m+8],F,2272392833),y=c(y,b,s,w,p[m+11],G,1839030562),w=c(w,y,b,s,p[m+14],H,4259657740),s=c(s,w,y,b,p[m+1],E,2763975236),b=c(b,s,w,y,p[m+4],F,1272893353),y=c(y,b,s,w,p[m+7],G,4139469664),w=c(w,y,b,s,p[m+10],H,3200236656),s=c(s,w,y,b,p[m+13],E,681279174),b=c(b,s,w,y,p[m+0],F,3936430074),y=c(y,b,s,w,p[m+3],G,3572445317),w=c(w,y,b,s,p[m+6],H,76029189),s=c(s,w,y,b,p[m+9],E,3654602809),b=c(b,s,w,y,p[m+12],F,3873151461),y=c(y,b,s,w,p[m+15],G,530742520),w=c(w,y,b,s,p[m+2],H,3299628645),s=C(s,w,y,b,p[m+0],I,4096336452),b=C(b,s,w,y,p[m+7],J,1126891415),y=C(y,b,s,w,p[m+14],K,2878612391),w=C(w,y,b,s,p[m+5],M,4237533241),s=C(s,w,y,b,p[m+12],I,1700485571),b=C(b,s,w,y,p[m+3],J,2399980690),y=C(y,b,s,w,p[m+10],K,4293915773),w=C(w,y,b,s,p[m+1],M,2240044497),s=C(s,w,y,b,p[m+8],I,1873313359),b=C(b,s,w,y,p[m+15],J,4264355552),y=C(y,b,s,w,p[m+6],K,2734768916),w=C(w,y,b,s,p[m+13],M,1309151649),s=C(s,w,y,b,p[m+4],I,4149444226),b=C(b,s,w,y,p[m+11],J,3174756917),y=C(y,b,s,w,p[m+2],K,718787259),w=C(w,y,b,s,p[m+9],M,3951481745),s=t(s,v),w=t(w,S),y=t(y,l),b=t(b,A);var N=h(s)+h(w)+h(y)+h(b);return N.toLowerCase()};
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
var app = angular.module('myApp', ['ngSanitize', 'ui.select']);

app.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});

app.controller('ResultCtrl', ResultCtrl);
app.controller('SelectCtrl', SelectCtrl);

//$('select').select2();

function ResultCtrl($scope, $http) {
	var vm = this;
	$scope.imgUrl = "http://cdn.ttnba.nbahero.com/img/players_head/"
	$scope.room = [];
	$scope.selectedArr = {
		'playerChoose': []
	};
	$scope.status_text = "界面初始化完成";
	$scope.roomStr = "选择房间号：";
	$scope.playerHave = "选择固定球员";
	$scope.playerNotHave= "选择删除球员";
	$scope.playerPostion = ['PG', 'SG', 'SF', 'PF', 'C'];
	$scope.playerStatusMap = ['正常','伤病','待定'];

	var passphrase = "DK9S9SDZHZMKFPMM";

	$scope.reset = function() {
		
		$scope.num_type = 0;
		$scope.people = [];
		$scope.allPlayer = [];

		vm.playerFixSelect = undefined;
		vm.playerExceptSelect= undefined;
	}
	$scope.resetSameRoom = function() {

		vm.playerFixSelect = undefined;
		vm.playerExceptSelect= undefined;
	}

	// $scope.addSelectedPlayer = function(type,model) {
	// 	console.log('type,model',type,model);
	// 	console.log(vm.playerFixSelect);
	// 	$scope.player[type] = [];
	// 	$scope.player[type] = model;
	// 	$scope.player[type+'IdArr'] = [];
	// 	for(var i in model){
	// 		$scope.player[type+'IdArr'].push(model[i].id);	
	// 	}
	// 	console.log($scope.player[type]);
	// }

	$scope.register = function() {
		$scope.status_text = "注册新用户中...";
		var timestamp = String(Date.parse(new Date) / 1e3);
		var httpRequest = $http({
			method: 'POST',
			url: 'http://ttnba.nbahero.com/platform/registerQuick',
			data: {
				"timestamp": timestamp,
				"sign": md5(timestamp + passphrase)
			}
		}).then(function successCallback(response) {
			if(!('result' in response.data))
				alert(response.status+" "+response.statusText+"\n"+response.data.message);
		    var user_token = response.data.result.user_token;
		    var user_account = response.data.result.user_account;
		    var password = response.data.result.password;
		    storage.set('account', { user_account: user_account, password: password }, function(error) {
				$scope.getAccount();
			});
		  }, function errorCallback(response) {
		    alert(response.status+" "+response.statusText);
		  });
	}

	$scope.getAccount = function() {
		storage.get('account', function(error, data) {
			  if (error) throw error;
			  if(!('user_account' in data)) {
			  	console.log("new user");
			  	$scope.register();
			  } else {
			  	console.log(data);
			  	$scope.getUserToken(data.user_account, data.password);
			  }
		});
	}

	$scope.getUserToken = function(user_account, password) {
		$scope.status_text = "获取User Token中...";
		var timestamp = String(Date.parse(new Date) / 1e3);
		var httpRequest = $http({
			method: 'POST',
			url: 'http://ttnba.nbahero.com/platform/login',
			data: {
				"user_account": user_account,
				"password": password,
				"timestamp": timestamp,
				"sign": md5(user_account + password + timestamp + passphrase)
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
			for(i in $scope.room) {
				$scope.room[i].num_type_text = ($scope.room[i].num_type==1?"五人":"八人")
			}
			console.log($scope.room.length);
			//console.log($scope.room);
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
			//console.log('selectPlayer',re);
			vm.playerExceptSelect = [];
			for (var i in re) {
				re[i].positionEn =  $scope.playerPostion[parseInt(re[i].position) - 1];
				re[i].statusCn = $scope.playerStatusMap[parseInt(re[i].status)];
				if(re[i].status != 0)
					vm.playerExceptSelect.push(re[i]);
			}
			$scope.$apply(function() {
				$scope.allPlayer = re;
				$scope.status_text = "完成";
			});
			cb();
			//console.log(reArr);
		});
	}

	$scope.changedValue = function(type, value) {
		console.log(type, value);
		$scope.reset();
		$scope.selectedArr[type] = value;
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
		var playerSelectedYesIdArr = (vm.playerFixSelect || []).map(function(obj) {return obj.id} );
		var playerSelectedNoIdArr = (vm.playerExceptSelect || []).map(function(obj) {return obj.id} );
		console.log(playerSelectedYesIdArr, playerSelectedNoIdArr);
		for (var p in $scope.allPlayer) {
			// console.log($scope.allPlayer[p]);
			if (playerSelectedNoIdArr.indexOf($scope.allPlayer[p].id) >= 0) {
				//console.log('true', $scope.allPlayer[p]);
				continue;
			}
			if (playerSelectedYesIdArr.indexOf($scope.allPlayer[p].id) >= 0) {
				var picked = $scope.allPlayer[p];
				// picked.positionEn = $scope.playerPostion[parseInt(picked.position) - 1];
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
		console.log('positionArr',positionArr);
		calu.calu(allSalary, positionArr, resStr, function(re) {
			var reArr = re.split(',');
			console.log(reArr);
			for (var i in reArr) {
				if (reArr[i] != '') {
					var picked = $scope.allPlayer.find(o => o.id === reArr[i]);
					//console.log(picked);
					// picked.positionEn = $scope.playerPostion[parseInt(picked.position) - 1];
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

	$scope.getAccount();

	$scope.search = function(){
		$scope.getResult();
	}

	//$scope.selectPlayer($scope.room[0].id);
	//console.log($scope.room);
}

function SelectCtrl() {

}