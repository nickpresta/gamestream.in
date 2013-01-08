var app = angular.module('GameStreamApp', []);
app.filter('beginAt', function() {
  return function(input, start, end) {
    if (end)
      return input.slice(start, end);
    else
      return input.slice(start);
  };
});

