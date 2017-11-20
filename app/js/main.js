angular.module('DIGICARD', ['ngRoute', 'ngMaterial', 'app.service', 'app.root.ctrl', 'app.filters', 'app.dashboard.ctrl','app.download.ctrl','pascalprecht.translate'])

.run(function($rootScope, $location) {
	console.log("welcome to digicard");

})
.config(function ($translateProvider) {
	$translateProvider.fallbackLanguage('en');
	$translateProvider.registerAvailableLanguageKeys(['en', 'ch'], {
		'en_*': 'en',
		'ch_*': 'ch'

	});

	$translateProvider.translations('en', {
		//English language
});
	$translateProvider.translations('ch', {
		//Chinese language

	});
	$translateProvider.useSanitizeValueStrategy('escape');
	$translateProvider.preferredLanguage('en');

})

.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix("");

	$routeProvider.
	when('/dashboard', {
		templateUrl: "templates/dashboard.html",
		controller: "DashboardCtrl as vm"
	}).
	when('/download',{
        templateUrl: "templates/download.html",
        controller: "DownloadCtrl as vm"
	})

	.otherwise({
		redirectTo: '/download'
	});
})
angular.module('app.root.ctrl', [])

.controller('RootCtrl', function($rootScope, $scope, $translate) {
	
	$scope.languageDisplay = "EN";
	$scope.changeLanguage = function(key){
		$translate.use(key);
		if (key ==="en") {
			$scope.languageDisplay = "EN";
		} else {
			$scope.languageDisplay = "CH";
		}
	}


});


/* @ngInject */
var DashboardCtrl = function() {
    var init, vm;
    vm = this;
    init = function() {
        vm.title = 'Hello Jigi';
        console.log("test")
    };
    init();
};
angular.module('app.dashboard.ctrl',[]).controller('DashboardCtrl', DashboardCtrl);

/* @ngInject */
var DownloadCtrl = function($window) {
    var init, vm, init_box;
    vm = this;
    init = function() {
        vm.unitHeight = $window.innerHeight;
        vm.title = 'Hello Jigi Download';
        vm.init_box = init_box;

        init_box('download');
    };

    init_box = function (id) {
        document.getElementById(id).style.height = vm.unitHeight+'px';
    };
    init();
};
angular.module('app.download.ctrl',[]).controller('DownloadCtrl', DownloadCtrl);

angular.module('app.filters', [])

.filter('text_fmt', function() {
	return function(input, opt) {
		switch(opt) {
			case 0:
				return input.toLowerCase();
			case 1:
				return input.replace(/\w\S*/g, function(txt){
					return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
				});
			case 2:
				return input.toUpperCase();
			default:
				return input;
		}
	}
})

.filter('nospace', function () {
    return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
    };
})

.filter('default_val', function() {
	return function (ori, def) {
		if(!ori) {
			return def;
		} else {
			return ori;
		}
	};
})

.filter('rd', function(){
	return function(value, opt){
		switch(opt){
			case 0:
				return moment(value).format("YYYY MMM DD");
			case 1:
				return moment(value).format("YYYY MMM DD hh:mm");
			case 2:
				return moment(value).format("hh:mm");
			default:
				return moment(value).format("YYYY MMM DD");
		}
		return 
	}
})
.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}])
.filter('bg_css', function(){
	return function(url){
		if(url) {
			var css = {
				"background-image": "url('"+url+"')"
			}
			return css;
		} else {
			return null;
		}
	}
})
angular.module('app.service', [])

.factory('sortBy', function($rootScope){
    return function sortBy(propertyName){
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
})
var DAO = (function() {
	var app = {};
	
	app.setSecret = function(secret) {
		localStorage.setItem("UI_SECRET", secret);
	};

	app.getSecret = function() {
		return localStorage.getItem("UI_SECRET");
	};

	return app;
})();