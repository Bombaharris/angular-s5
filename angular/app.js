'use strict';

var myApp = angular.module('spicyApp1', []);

myApp.controller('SpicyController', ['$scope', function ($scope) {
        $scope.spice = 'very';

        $scope.chiliSpicy = function () {
            $scope.spice = 'chili';
        };

        $scope.jalapenoSpicy = function () {
            $scope.spice = 'jalapeño';
        };
    }]);

var myApp1 = angular.module('scopeInheritance', []);

myApp1.controller('MainController', ['$scope', function ($scope) {
        $scope.rodzina = 'Kowalscy';
        $scope.imie = 'Jan';
    }]);
myApp1.controller('ChildController', ['$scope', function ($scope) {
        $scope.imie = 'Darek';
    }]);
myApp1.controller('GrandChildController', ['$scope', function ($scope) {
        $scope.rodzina = 'Nowak';
        $scope.imie = 'Tomek';
    }]);


var myApp2 = angular.module('myServiceModule', []);

myApp2.controller('MyController', ['$scope', 'notify', function ($scope, notify) {
        $scope.callNotify = function (msg) {
            notify(msg);
        };
    }]);
myApp2.factory('notify', ['$window', function ($window) {
        var msgs = [];
        return function (msg) {
            msgs.push(msg);
            if (msgs.length === 3) {
                $window.alert(msgs.join("\n"));
                msgs = [];
            }
        };
    }]);


var myApp3 = angular.module('myScopeModule', []);

myApp3.controller('AController', ['$rootScope', '$scope', function ($rootScope, $scope) {
        $scope.message = '';
        $scope.broadcast = function () {
            $rootScope.$broadcast('a', 'A');
        };
        $scope.$on('b', function (event, args) {
            $scope.message = $scope.message.concat(args);
        });
    }]);

myApp3.controller('BController', ['$rootScope', '$scope', function ($rootScope, $scope) {
        $scope.message = '';
        $scope.broadcast = function () {
            $rootScope.$broadcast('b', 'B');
        };
        $scope.$on('a', function (event, args) {
            $scope.message = $scope.message.concat(args);
        });
    }]);

var myApp4 = angular.module('myExpressionModule', []);

var myApp5 = angular.module('myFilterModule', []);

myApp5.filter('uppercase', function() {
  return function(input) {
      return input.toUpperCase();
  };
});

myApp5.filter('lowercase', function() {
  return function(input) {
      return input.toLowerCase();
  };
});


var myApp6 = angular.module('myDirectiveModule', []);

myApp6.directive('customCheckbox', function () {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<span class="checkbox" ng-class="{checked: isChecked}" ng-click="toggleMe()"></span>',
        scope: {isChecked: '=?'},
        link: function (scope, elem, attrs) {
            scope.isChecked = false;
            scope.toggleMe = function () {
                scope.isChecked = !(scope.isChecked);
            }
        }
    }
});