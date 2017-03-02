angular.module('app').conroller('homeCtrl', function($scope, svc, $stateParams) {

    $scope.friends = svc.friends;

    svc.friendActivity($stateParams.username).then(response => {
        $scope.friend = response;
    })

    $scope.eventData = svc.eventData;



})