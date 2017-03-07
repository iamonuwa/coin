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
    'chieffancypants.loadingBar',
    'ngMap',
    'ngMessages'
	])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {
	$urlRouterProvider.otherwise('/');
	// $locationProvider.hashPrefix('');

  // cfpLoadingBarProvider.includeSpinner = true;
  cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
  cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';

	$stateProvider
		.state('public', {
			abstract: true,
			templateUrl: 'views/templates/public.templates.views.client.html',
			pageTitle: "Welcome to Coin Exchange",
		})
    .state('public.signin', {
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
    .state('public.register', {
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
.controller('buyController', BuyController)

.directive('a', preventClickDirective)
.factory("Auth", ['$firebaseAuth', function($firebaseAuth) {
  return $firebaseAuth();
}])
.factory("DatabaseRef", function() {
  return firebase.database().ref();
})

.factory('currency', ['$http', function ($http) {
    var CURRENCY_ENDPOINT = 'http://apilayer.net/api/live?access_key=ae1c9e6e5ee4f5b211256b8a8c1b7713';

  return {

  };
}])


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
        $scope.id = $firebaseUser.uid;
        $scope.user = $firebaseUser.displayName;
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

LoginController.inject = ['$scope', '$state', '$firebaseAuth', 'Auth'];
function LoginController($scope, $state, $firebaseAuth, Auth) {
  $scope.login = function () {
    var auth = $firebaseAuth();
      auth.$signInWithEmailAndPassword($scope.email, $scope.password).then(function (response) {
        if(response.emailVerified){
            Materialize.toast("Welcome "+ response.displayName , 3000);
              $state.go('app.index');
        }
        else{
          Materialize.toast("Login failed. Please verify your account.", 3000);
          Auth.$signOut();
          $state.go('app.index');
        }
      }).catch(function (error) {
        Materialize.toast(error.message, 3000);
      })

  }
}

RegisterController.inject = ['$scope', '$firebaseAuth', '$state', 'DatabaseRef'];
function RegisterController($scope, $firebaseAuth, $state, DatabaseRef) {

  $scope.create_account = function () {
    var auth = $firebaseAuth();
    $scope.displayName = $scope.lastname + ' ' + $scope.firstname + ' ' + $scope.othername;

    if($scope.password !== $scope.confirm_password){
      Materialize.toast("Passwords do not match.", 3000)
    }
    else{
        auth.$createUserWithEmailAndPassword($scope.email, $scope.password).then(function ($firebaseUser) {
          $firebaseUser.updateProfile({
            displayName: $scope.displayName
          }).then(function () {
            DatabaseRef
                    .child('users')
                    .child($firebaseUser.uid)
                    .set({
                      firstname: $scope.firstname,
                      lastname: $scope.lastname,
                      othername: $scope.othername,
                      location: $scope.address,
                      phone: $scope.phone,
                      email: $scope.email,
                      gender: $scope.gender,
                      dob: $scope.dob,
                      bankName: $scope.bank,
                      accountName: $scope.accountName,
                      accountNumber: $scope.accountNumber
                    });
            $firebaseUser.sendEmailVerification();
            Materialize.toast("Your account has been created! Please check your mail to verify your account", 3000);
            $state.go('app.index');
          }, function (error) {
            Materialize.toast(error, 3000);
          })
        })
    }
  }
}

BuyController.inject = ['$scope', 'DatabaseRef', '$firebaseObject', 'Auth'];
function BuyController($scope, DatabaseRef, $firebaseObject, Auth) {
  var uid = Auth.$getAuth().uid;

  $scope.exchange = false;

  if($scope.exchange != true){
    $scope.toggle_application_btn = "Apply for Currency Exchange";
  }
  else if($scope.exchange == true) {
    $scope.toggle_application_btn = "Cancel Application";
  }

  $scope.getMyApplications = function () {
      var item = DatabaseRef.child('application').child(uid);
      item.once('value').then(function (snapshot) {
        $scope.applications = snapshot.val();
      })
  }

  $scope.loadAccount = function () {
    var item = DatabaseRef.child('users').child(uid);
    item.once('value').then(function (snapshot) {
      $scope.form.bankName = snapshot.val().bankName;
      $scope.form.accountName = snapshot.val().accountName;
      $scope.form.accountNumber = snapshot.val().accountNumber;
    }) 
  }
  
  $scope.money = {
        naira: "NAIRA", 
        btc: "BTC", 
        payza: "PAYZA", 
        perfect_money: "PERFECT MONEY", 
        web_money: "WEB MONEY", 
        paypal: "PAYPAL"
  };


    $scope.currency = function (value) {
      switch(value){
        case "NAIRA":
          return 10;
          break;
        case "BTC":
          return 20;
          break;
        case "PAYZA":
          return 30;
          break;
        case "PERFECT MONEY":
          return 40;
          break;
        case "WEB MONEY":
          return 50;
          break;
        case "PAYPAL":
          return 60;
          break;
        default:
          return 0;
      }
    }
    $scope.getTotalAmount = function () {
      return $scope.form.units * $scope.currency($scope.form.buying);
    }
  $scope.apply = function () {
    var timestamp = new Date().getTime();

    // if(($scope.application.selling == undefined) || ($scope.application.buying == undefined) || ($scope.application.units == undefined)){
    //   Materialize.toast("All fields are required.", 3000);
    // }
    // else{
      var data = {
          selling: $scope.form.selling,
          buying: $scope.form.buying,
          units: $scope.form.units,
          amount: $scope.getTotalAmount() + ' ' + $scope.form.buying,
          accountNumber: $scope.form.accountNumber,
          accountName: $scope.form.accountName,
          bankName: $scope.form.bankName, 
      }
      var newKey = DatabaseRef.child('users/'+ uid +'/applications').push().key;
      var submit = {};
      submit['users/'+ uid +'/applications/' + newKey] = data;
      DatabaseRef.update(submit).then(function () {
        Materialize.toast("Your application has been submitted. We'll get back to you in the next 24 hours", 3000);
      })
      .catch(function (error) {
        Materialize.toast(error, 3000);
      })
    // }
  }
}

function currency_type(currency) {
  
}