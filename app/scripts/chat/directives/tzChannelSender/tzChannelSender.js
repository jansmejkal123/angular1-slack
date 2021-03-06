(function() {
  'use strict';

  angular
    .module('app.chat')
    .directive('tzChannelSender', tzChannelSender);

  function tzChannelSender() {
    return {
      restrict: 'E',
      templateUrl: 'scripts/chat/directives/tzChannelSender/tz-channel-sender.tpl.html',
      controller: TzChannelSenderController,
      controllerAs: 'tzChannelSender'
    };
  }

  function TzChannelSenderController() {
  }
})();
