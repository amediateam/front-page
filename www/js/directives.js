/**
 * Created by perry on 7/31/14.
 */

angular.module('frontpage.directives', [])
.directive('searchBar', function() {
  return {
    restrict: 'E',
    replace: true,
    require: '?ngModel',
    scope: {
      model: '=?',
      focused: '=?',
      submit: '&',
      clear: '&'
    },
    template:function(){
      if(ionic.Platform.isAndroid()){
        return '<form class="bar bar-header bar-energized item-input-inset" ng-submit="submit()">' +
          '<div class="item-input-wrapper light-bg" ng-class="focused" ng-click="focus()">' +
          '<i class="icon ion-ios7-search-strong placeholder-icon"></i>' +
          '<input type="search"' +
          'id="searchInput"' +
          'placeholder="Search HN"' +
          'ng-model="model"' +
          'ng-focus="focused = \'text-left\'"' +
          'ng-blur="focused = model.length?\'left\':\'centered\'">' +
          '</div>' +
          '<i class="icon ion-ios7-close dark" ng-show="model.length" ng-click="clear()"></i>' +
          '</form>'
      }
      return '<form class="bar bar-header bar-energized item-input-inset" ng-submit="submit()">' +
        '<div class="item-input-wrapper energized-bg" ng-class="focused" ng-click="focus()">' +
        '<i class="icon ion-ios7-search placeholder-icon"></i>' +
        '<input type="search"' +
        'id="searchInput"' +
        'placeholder="Search"' +
        'ng-model="model"' +
        'ng-focus="focused = \'text-left\'"' +
        'ng-blur="focused = model.length?\'left\':\'centered\'">' +
        '</div>' +
        '<i class="icon ion-ios7-close dark" ng-show="model.length" ng-click="clear()"></i>' +
        '</form>'
    },
    link: function(scope, elem, attrs, $document){
      scope.focus = function(){
        document.getElementById('searchInput').focus()
      }
    }
  };
})
// custom directive to bind to hold events and trigger the sharing plugin
// expects the parent scope to contain a post item from the HNAPI service
.directive('fpShare', function($ionicGesture) {
  return {
    restrict :  'A',
    link : function(scope, elem) {
      $ionicGesture.on('hold',share , elem);

      function share(){
        if(typeof window.plugins === 'undefined' || typeof window.plugins.socialsharing === 'undefined'){
          console.error("Social Sharing Cordova Plugin not found. Disregard if on a desktop browser.");
          return;
        }
        window.plugins
          .socialsharing
          .share(null,
          null,
          null,
          scope.$parent.post.url)
      }
    }
  }
});