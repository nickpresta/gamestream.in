function StreamListCtrl($scope, $http, $filter) {
  $scope.fetchOwn3d = function() {
    $http.get('http://api.own3d.tv/rest/live/list.json?liveonly=1').success(function(data, status) {
      if (status != 200) {
        return;
      }

      // Clear any fetch errors
      $scope.fetchErrors = 0;

      var jsonData = angular.fromJson(data);
      $.each(jsonData, function(index, data) {
        $scope.streams.push({
          'Game': data.game_name,
          'Stream': data.live_description,
          'Streamer': data.channel_name,
          'Viewers': parseInt(data.live_viewers),
          'url': data.link
        });
      });
    }).error(function(data, status, headers, config) {
      $scope.fetchErrors++;
    });
  };

  $scope.fetchTwitchTV = function() {
    $http.jsonp('https://api.twitch.tv/kraken/streams/?callback=JSON_CALLBACK').success(function(data, status) {
      if (status != 200) {
        return;
      }

      var jsonData = angular.fromJson(data);
      if (jsonData.streams == undefined) {
        return;
      }

      // Clear any fetch errors
      $scope.fetchErrors = 0;

      $.each(jsonData.streams, function(index, data) {
        $scope.streams.push({
          'Game': data.game,
          'Stream': data.channel.status,
          'Streamer': data.channel.display_name,
          'Viewers': data.viewers,
          'url': data.channel.url
        });
      });
    }).error(function (data, status, headers, config) {
      $scope.fetchErrors++;
    });
  };

  $scope.sortByHeader = function(header) {
    $scope.currentPage = 0;
    $scope.sortColumn = header;
    $scope.reverse = !$scope.reverse;
  };

  $scope.numberOfPages = function() {
    var filter = $filter('filter');
    var filtered = filter($scope.streams, $scope.query);
    return Math.ceil(filtered.length / $scope.pageSize);
  };

  $scope.headers = [
    {name: 'Game', _class: 'span2 header'},
    {name: 'Streamer', _class: 'span2 header'},
    {name: 'Stream', _class: 'span4 header'},
    {name: 'Viewers', _class: 'span1 header' }
  ];

  $scope.streams = [];

  $scope.sortColumn = 'Viewers';
  $scope.reverse = true;
  $scope.pageSize = 25;
  $scope.currentPage = 0;
  $scope.query = '';

  $scope.fetchErrors = 0;
  $scope.totalServices = 2;
  $scope.fetchTwitchTV();
  $scope.fetchOwn3d();
}