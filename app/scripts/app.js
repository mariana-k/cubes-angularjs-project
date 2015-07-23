(function(){
'use strict';

/**
 * @ngdoc overview
 * @name cubesApp
 * @description
 * # cubesApp
 *
 * Main module of the application.
 */
angular
  .module('cubesApp', [
    'ngRoute',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'cl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
})();