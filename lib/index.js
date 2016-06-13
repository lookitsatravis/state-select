module.exports = angular.module("bpClient.directives.state-select", [])
  .directive('bpStateSelect', ['$timeout', '$compile', BpStateSelect])
  ;

function BpStateSelect($timeout, $compile) {
  return {
    restrict: 'E',
    scope: {
      country: '=',
      state: '='
    },
    link: link
  };

  function link(scope, element, attrs) {
    //https://github.com/substack/provinces/blob/master/provinces.json
    var states = require('./states.js');
    var firstLoad = true;

    scope.$watch('country', function(value) {
      if(!firstLoad) {
        $timeout(function() {
          scope.$apply(function() {
            scope.state = null;
          });
        });
      } else {
        firstLoad = false;
      }

      var stateGroup = states[value];
      if(angular.isDefined(stateGroup)) {
        element.empty();
        var select = angular.element('<select name="' + attrs.name + '" required></select>');
        if(attrs.required === "true") {
          select.prop("required", true);
        }
        element.append(select);
        $compile(select)(scope);

        select.append('<option disabled selected>Select a State/Province</option>');

        for(var s in stateGroup) {
          var state = stateGroup[s];
          if(state.code) {
            select.append('<option value="' + state.code + '">' + state.name + '</option>');
          } else if(state.region) {
            select.append('<option value="' + state.name + ', ' + state.region + '">' + state.name + ', ' + state.region + '</option>');
          } else {
            select.append('<option value="' + state.name + '">' + state.name + '</option>');
          }
        }

        select.val(scope.state);

        select.bind('change', function() {
          scope.$apply(function() {
            scope.state = select.val();
          });
        });

      } else {
        element.empty().append('<input type="text" name="' + attrs.name + '" placeholder="' + attrs.placeholder + '" required>');
        var input = element.find('input');
        input.val(scope.state);
        input.bind('keyup', function() {
          scope.$apply(function() {
            scope.state = input.val();
          });
        });
      }
    });
  }
}
