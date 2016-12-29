/**
 * Created by zoonman on 12/12/16.
 */

app.controller('MainCtrl', ['$scope', 'socket', '$window', '$rootScope', '$localStorage', '$sessionStorage', function($scope, socket, $window, $rootScope, $localStorage, $sessionStorage) {
    $scope.currentCategorySlug = 'general';
    console.log("Main");
    $rootScope.websocketAlive = false;

    $localStorage.$default({
        rememberMe: true,
        experimental: false,
        sendCommentsCtrl: 'CtrlEnter'
    });

    $rootScope.logout = function() {
        $localStorage.$reset();
        $sessionStorage.$reset();
        $localStorage.rememberMe = false;
        $rootScope.user = null;
        $rootScope.$applyAsync();
    };

    socket
        .on('connect', function(msg) {
            $rootScope.websocketAlive = true;
            console.log("connected");
            var jwt;
            if ($localStorage.rememberMe) {
                jwt = $localStorage.jwt;
            } else {
                jwt = $sessionStorage.jwt;
            }
            if (jwt) {
                console.log("authenticating", jwt);
                socket.emit('authenticate', {token: jwt}, function(a) {
                    console.log('a', a)
                }); // send the jwt
            } else {
            }
            socket.on('user', function(user) {
                console.log('authenticated:', user);
                $rootScope.user = angular.copy(user);
            });
        });

    socket.on('disconnect', function() {
        $rootScope.websocketAlive = false;
    });



}]);