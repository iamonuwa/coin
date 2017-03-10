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
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider', '$rootScopeProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider, $rootScopeProvider) {
	// Angular sets a limit of 10 iterations per digest cycle. 
  // But am setting it to 1000 iterations per digest cycle. This will assist in loading firebase data over a thin network.
  // $rootScopeProvider.digestTtl(1000);

  $urlRouterProvider.otherwise('/');
	// $locationProvider.hashPrefix('');

  // cfpLoadingBarProvider.includeSpinner = true;
  cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
  // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';

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
    .state('app.faq', {
      url: '/frequently-asked-questions',
      templateUrl: 'views/faq.views.client.html',
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
    .state('app.why', {
      url: '/why-us',
      templateUrl: 'views/why.views.client.html',
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
    .state('app.contact', {
      url: '/contact-us',
      templateUrl: 'views/contact.views.client.html',
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
    .state('app.buy_sell', {
      url: '/buy-and-sell',
      templateUrl: 'views/buy_sell.views.client.html',
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
      url: '/apply-for-exchange',
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
    .state('app.settings', {
      url: '/admin/application-settings',
      templateUrl: 'views/admin/settings.views.client.html',
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
    .state('app.users', {
      url: '/admin/users',
      templateUrl: 'views/admin/settings.views.client.html',
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
    .state('admin', {
      abstract: true,
      templateUrl: 'views/templates/admin.templates.views.client.html',
      pageTitle: "Welcome to Coin Exchange",
    })
}])
.run(["$rootScope", "$state", 'Auth', 'DatabaseRef', function($rootScope, $state, Auth, DatabaseRef) {
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
.controller('usersController', UsersController)
.controller('settingsController', SettingsController)

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

NavbarController.inject = ['$rootScope', '$scope', '$state', 'Auth', 'DatabaseRef', '$firebaseObject'];
function NavbarController($rootScope, $scope, $state, Auth, DatabaseRef, $firebaseObject) {

    $scope.openModal = false;

     Auth.$onAuthStateChanged(function($firebaseUser) {
      if ($firebaseUser != null) {
      var ref = firebase.database().ref('users').child(Auth.$getAuth().uid);
      $scope.exchange_rates = $firebaseObject(ref);
      $scope.id = $firebaseUser.uid;
        $scope.user = $firebaseUser.displayName;
        var ref = DatabaseRef.child('users').child($firebaseUser.uid);
        $scope.role = $firebaseObject(ref);
        // if(user.type == 'admin'){
        //   $scope.toggle_role = true;
        // }
        // else{
        //   $scope.toggle_role = false;
        // }

        // item.on('value', function (snapshot) {
        //   $scope.role = snapshot.val().type;
        //   if($scope.role === 'admin'){
        //     $scope.toggle_role = true;
        //   }
        //   else{
        //     $scope.toggle_role = false;
        //   }
        // })
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

LoginController.inject = ['$scope', '$state', '$firebaseAuth', 'Auth', 'DatabaseRef'];
function LoginController($scope, $state, $firebaseAuth, Auth, DatabaseRef) {
  $scope.login = function () {
    var auth = $firebaseAuth();
    if((angular.isDefined($scope.email) && $scope.email != "") && (angular.isDefined($scope.password) && $scope.password != "")){
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
    else{
      Materialize.toast("Please provide your login credentials");
    }

  }
}

RegisterController.inject = ['$scope', '$firebaseAuth', '$state', 'DatabaseRef', 'Auth'];
function RegisterController($scope, $firebaseAuth, $state, DatabaseRef, Auth) {

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
                      accountNumber: $scope.accountNumber,
                      type: 'client'
                    });
            $firebaseUser.sendEmailVerification();
            Materialize.toast("Your account has been created! Please check your mail to verify your account", 3000);
            Auth.$signOut();
            $state.go('app.index');
          }).catch(function (error) {
              Materialize.toast(error.message, 3000);
            })
        })
    }
  }
}

BuyController.inject = ['$scope', 'DatabaseRef', '$firebaseObject', 'Auth'];
function BuyController($scope, DatabaseRef, $firebaseObject, Auth) {
  var uid = Auth.$getAuth().uid;

  $scope.getMyApplications = function () {
      var item = DatabaseRef.child('application').child(uid);
      item.once('value').then(function (snapshot) {
        $scope.applications = snapshot.val();
      })
  }

  $scope.loadAccount = function () {
    var ref = firebase.database().ref('exchange_rates');
    $scope.exchange_rates = $firebaseObject(ref);

    var item = DatabaseRef.child('users').child(uid);
    item.once('value').then(function (snapshot) {
      $scope.form.bankName = snapshot.val().bankName;
      $scope.form.accountName = snapshot.val().accountName;
      $scope.form.accountNumber = snapshot.val().accountNumber;
    }) 
  }
  
  $scope.money = [
      {"currency": "NAIRA","unit": "10"}, 
      {"currency": "BITCOIN","unit": "20"}, 
      {"currency": "PAYZA","unit": "30"}, 
      {"currency": "PERFECT MONEY","unit": "40"}, 
      {"currency": "WEB MONEY","unit": "50"}, 
      {"currency": "PAYPAL","unit": "60"}, 
    ];

  $scope.getTotalAmount = function () {
    if((angular.isDefined($scope.form.buying) && $scope.form.buying != "") && (angular.isDefined($scope.form.worth) && $scope.form.worth != "")){
      return parseInt($scope.form.worth * $scope.form.buying.unit);
    }
    else{
      return "0.00";
    }
  }
  $scope.apply = function () {
      var data = {
          selling: $scope.form.selling,
          buying: $scope.form.buying.currency,
          units: $scope.form.worth,
          amount: $scope.getTotalAmount(),
          accountNumber: $scope.form.accountNumber,
          accountName: $scope.form.accountName,
          bankName: $scope.form.bankName, 
      }
      var newKey = DatabaseRef.child('users/'+ uid +'/applications').push().key;
      var submit = {};
      submit['users/'+ uid +'/applications/' + newKey] = data;
      DatabaseRef.update(submit).then(function () {
        Materialize.toast("Your application has been submitted. We'll get back to you in the next 24 hours", 3000);
        $scope.form.selling = '';
        $scope.form.buying = '';
        $scope.form.worth = '';
      })
      .catch(function (error) {
        Materialize.toast(error, 3000);
      })
  }
}

SettingsController.inject = ['$scope', 'DatabaseRef', 'Auth', '$firebaseObject'];
function SettingsController($scope, DatabaseRef, Auth, $firebaseObject) {

  $scope.loadConfiguration = function () {
    var ref = firebase.database().ref('application_configuration');
    var config = $firebaseObject(ref);
    // console.log("Loading");
    // config.$loaded().then(function () {
      // console.log("Loaded");
      $scope.config = config;
    // })
  }

  $scope.loadExchangeRates = function () {
    var ref = firebase.database().ref('exchange_rates').child('currencies');
    $scope.exchange_rates = $firebaseObject(ref);
  }

  $scope.updateConfiguration = function () {
    DatabaseRef
          .child('application_configuration')
          .set({
            application_name: $scope.config.application_name,
            facebook_link: $scope.config.facebook_link,
            twitter_link: $scope.config.twitter_link,
            google_link: $scope.config.google_link
          }).then(function () {
            Materialize.toast("Your application details has been updated!", 3000);
          }).catch(function (error) {
            Materialize.toast(error.message, 3000)
          })
  };

  $scope.updateExchangeRates = function () {
    // Store data in json format (ie. key = { key => value})
    $scope.money = {
      "currencies": 
      [
      {"currency": "NAIRA","unit": $scope.exchange_rates[0].unit}, 
      {"currency": "BITCOIN","unit": $scope.exchange_rates[1].unit}, 
      {"currency": "PAYZA","unit": $scope.exchange_rates[2].unit}, 
      {"currency": "PERFECT MONEY","unit": $scope.exchange_rates[3].unit}, 
      {"currency": "WEB MONEY","unit": $scope.exchange_rates[4].unit}, 
      {"currency": "PAYPAL","unit": $scope.exchange_rates[5].unit}, 
    ]};
    DatabaseRef
              .child('exchange_rates')
              .set($scope.money).then(function () {
                Materialize.toast("Exchange Rates has been updated!", 3000);
              }).catch(function (error) {
                Materialize.toast(error.message, 3000);
              })
  }
}

UsersController.inject = ['$scope', 'DatabaseRef', '$firebaseObject', 'Auth'];
function UsersController($scope, DatabaseRef, $firebaseObject, Auth) {
  var uid = Auth.$getAuth().uid;

  $scope.getMyApplications = function () {
      var item = DatabaseRef.child('users');
      item.once('value').then(function (snapshot) {
        $scope.users = snapshot.val();
        console.log($scope.users);
      })
  }


}
