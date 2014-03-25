var usersModule = angular.module('usersModule', []);

function coreController($scope, $http) {
    $scope.formData = {};
    
    $http.get('http://istim-istimchatapi.nodejitsu.com/users')
        .success(function (data) {
            $scope.userss = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
}