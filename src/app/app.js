(function() {
  'use strict';
  angular.module('formioAppBasic', [
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'formio',
    'ngFormioHelper'
  ])
  .config([
    '$locationProvider',
    '$stateProvider',
    '$urlRouterProvider',
    'FormioProvider',
    'FormioAuthProvider',
    'FormioResourceProvider',
    'AppConfig',
    '$injector',
    function(
      $locationProvider,
      $stateProvider,
      $urlRouterProvider,
      FormioProvider,
      FormioAuthProvider,
      FormioResourceProvider,
      AppConfig,
      $injector
    ) {
      $locationProvider.hashPrefix('');
      FormioProvider.setAppUrl(AppConfig.appUrl);
      FormioProvider.setBaseUrl(AppConfig.apiUrl);
      FormioAuthProvider.setForceAuth(false);
      FormioAuthProvider.setStates('synergy', 'synergy');
      //FormioAuthProvider.register('login', 'user', 'login');
      //FormioAuthProvider.register('register', 'user', 'register');
      FormioAuthProvider.register('synergy');
      //$urlRouterProvider.when('/', '/synergy');
      console.log($urlRouterProvider.state);

      $stateProvider
        .state('synergy', {
          url: '/synergy',
          templateUrl: 'results.html',
          controller: ['$scope', '$state', function($scope, $state) {
            $scope.$on('formLoad', function(event, formLoad) {
              console.log("hula hoop");
              $state.go('thanks');
            })
          }]
        })

          //controller: ['$scope', '$state', function($scope, $state) {
          //  $scope.$on('formSubmission', function(event, submission) {
          //    $state.go('results');
          //  })
          //}]
        
        .state('results', {
          url: '/results',
          template: '' +
          'div class="panel panel-default>' + 
            '<div class="panel-heading">Results</div>' +
            '<div class="panel-body">' +
              '<formio-grid src="\'https://vccypkgurkplbnu.form.io/synergy/submissions\'"></formio-grid>' +
            '</div>' +
          '</div>' 
        })
        .state('thanks', {
          url: '/thanks',
          template: '' +
          '<div><p>hi</p></div>' 
        });

      // Register all of the resources.
      angular.forEach(AppConfig.resources, function(resource, name) {
        FormioResourceProvider.register(name, resource.form, $injector.get(resource.resource + 'Provider'));
      });

      $urlRouterProvider.otherwise('/synergy');
    }
  ]);
})();
