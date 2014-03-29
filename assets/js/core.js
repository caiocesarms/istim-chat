var usersModule = angular.module('usersModule', []);

function coreController($scope, $http) {
    $scope.formData = {};
    //http://istim-istimchatapi.nodejitsu.com/users
    $http.get('http://localhost:1337/users')
        .success(function (data) {
            $scope.userss = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
}