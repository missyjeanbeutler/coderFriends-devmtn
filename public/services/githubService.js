angular.module('app').service('svc', function($http){
    
    this.getFollowing = function() {
        return $http.get('/api/github/following').then(response => {
            this.friends = response.data;
        })
    }

    this.friendActivity = function(username) {
        return $http.get('/api/github/' + username + '/activity').then(response => {
            this.eventData = response.data;
        })
    }

})