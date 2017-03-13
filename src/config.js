var APP_URL = 'https://vccypkgurkplbnu.form.io';
var API_URL = 'https://api.form.io';

// Parse query string
var query = {};
location.search.substr(1).split("&").forEach(function(item) {
  query[item.split("=")[0]] = item.split("=")[1] && decodeURIComponent(item.split("=")[1]);
});

APP_URL = query.appUrl || APP_URL;
API_URL = query.apiUrl || API_URL;

angular.module('formioAppBasic').constant('AppConfig', {
  appUrl: APP_URL,
  apiUrl: API_URL,
  forms: {
    userForm: APP_URL + '/user',
    userLoginForm: APP_URL + '/user/login',
    userRegisterForm: APP_URL + '/user/register',
    synergyForm: APP_URL + '/synergy'
  },
  resources: {
    user: {
      form: APP_URL + '/user',
      resource: 'UserResource'
    }
  }
});
