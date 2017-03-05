/**
* coin Module
*
* Coin Exchange Main Module
* All required angular dependency goes here.
*/
angular.module('coin', [
		'ui.router',
		'firebase',
		'ui.materialize',
    'angular-loading-bar'
	])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {
	$urlRouterProvider.otherwise('/');
	$locationProvider.hashPrefix('');

  cfpLoadingBarProvider.includeSpinner = true;

	$stateProvider
		.state('app', {
			abstract: true,
			templateUrl: 'views/templates/ui.templates.views.client.html',
			pageTitle: "Welcome to Coin Exchange",
		})
		.state('app.index', {
			url: '/',
			templateUrl: 'views/index.views.client.html',
			pageTitle: "Welcome to Coin Exchange",
      resolve: {
        // controller will not be loaded until $waitForSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $waitForSignIn returns a promise so the resolve waits for it to complete
          return Auth.$waitForSignIn();
        }]
      }
		})
    .state('app.dashboard',{
      url: '/dashboard',
      templateUrl: 'views/dashboard.views.client.html',
      pageTitle: 'Coin Exchange Application Form',
      public: false,
      resolve: {
        // controller will not be loaded until $waitForSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $waitForSignIn returns a promise so the resolve waits for it to complete
          return Auth.$requireSignIn();
        }]
      }
    })
    .state('app.profile', {
      url: '/u/:id',
      templateUrl: 'views/profile.views.client.html',
      pageTitle: 'Modify Account',
      public: false,
      resolve: {
        // controller will not be loaded until $waitForSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $waitForSignIn returns a promise so the resolve waits for it to complete
          return Auth.$requireSignIn();
        }]
      }
    })
    .state('app.buy', {
      url: '/buy',
      templateUrl: 'views/buy.views.client.html',
      pageTitle: 'Coin Exchange Application Form',
      public: false,
      resolve: {
        // controller will not be loaded until $waitForSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $waitForSignIn returns a promise so the resolve waits for it to complete
          return Auth.$requireSignIn();
        }]
      }
    })
    .state('app.signin', {
      url: '/signin',
      templateUrl: 'views/auth/signin.auth.views.client.html',
      pageTitle: 'Signin into Account',
      public: true,
      resolve: {
        // controller will not be loaded until $waitForSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $waitForSignIn returns a promise so the resolve waits for it to complete
          return Auth.$waitForSignIn();
        }]
      }
    })
    .state('app.register', {
      url: '/register',
      templateUrl: 'views/auth/register.auth.views.client.html',
      pageTitle: 'Register Account',
      public: true,
      resolve: {
        // controller will not be loaded until $waitForSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $waitForSignIn returns a promise so the resolve waits for it to complete
          return Auth.$waitForSignIn();
        }]
      }
    })
}])
.run(["$rootScope", "$state", 'Auth', function($rootScope, $state, Auth) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $state.go("app.index");
    }
  });
  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    if(toState.public === true && Auth.$getAuth() != null){
      e.preventDefault();
    }
  });
}])

.controller('navbarController', NavbarController)
.controller('loginController', LoginController)
.controller('registerController', RegisterController)

.directive('a', preventClickDirective)
.factory("Auth", ['$firebaseAuth', function($firebaseAuth) {
  return $firebaseAuth();
}])
.factory("DatabaseRef", function() {
  return firebase.database().ref();
})


//Prevent click if href="#"
function preventClickDirective() {
  var directive = {
    restrict: 'E',
    // link: link
  }
  return directive;
}

NavbarController.inject = ['$rootScope', '$scope', '$state', 'Auth', 'DatabaseRef'];
function NavbarController($rootScope, $scope, $state, Auth, DatabaseRef) {

    $scope.openModal = false;

     Auth.$onAuthStateChanged(function($firebaseUser) {
      if ($firebaseUser != null) {
        $scope.uid = $firebaseUser.uid;
        var item = DatabaseRef.child('users').child($scope.uid);
        item.once('value').then(function (snapshot) {
          $scope.user = snapshot.val().displayName;
        })
        $scope.loggedIn = true;
      } else {
        $scope.loggedIn = false;
      }
    })
  
    $scope.logout = function() {
      Auth.$signOut();
      Auth.$onAuthStateChanged(function($firebaseUser) {
        Materialize.toast("You have successfully logged out.", 3000);
      });
      $state.go('app.index');
    }


}

LoginController.inject = ['$scope', '$state', '$firebaseAuth'];
function LoginController($scope, $state, $firebaseAuth) {
  $scope.login = function () {
    var auth = $firebaseAuth();
      auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(function (response) {
        if(response.emailVerified){
            Materialize.toast("Welcome "+ response.email , 3000);
              $state.go('app.dashboard');
        }
        else{
          Materialize.toast("Welcome " + response.email + ", Please verify your account.", 3000);
          $state.go('app.dashboard');
        }
      }).catch(function (error) {
        Materialize.toast(error.message, 3000);
      })

  }
}

RegisterController.inject = ['$scope', 'currentAuth'];
function RegisterController($scope, currentAuth) {
  // body...
}
