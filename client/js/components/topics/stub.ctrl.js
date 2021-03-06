/**
 * Created by zoonman on 11/27/16.
 */

app.controller(
    'TopicStubController',
    ['socket',
     '$scope',
     'CategoriesFactory',
     '$routeParams',
     '$timeout',
     'PerfectScrollBar',
     '$localStorage',
     '$document',
     function(socket,
              $scope,
              CategoriesFactory,
              $routeParams,
              $timeout,
              PerfectScrollBar,
              $localStorage,
         $document) {

       CategoriesFactory.load().then(function(cats) {
         if ($routeParams.category) {
           CategoriesFactory.active($routeParams.category);
           $scope.activeCategory = CategoriesFactory.active();
           if ($scope.activeCategory) {
              $document[0].title = $scope.activeCategory.name;
           }

         } else {
           $scope.activeCategory = CategoriesFactory.active();
         }
       });
     }
    ]
);
