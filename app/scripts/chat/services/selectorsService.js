(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('selectorsService', selectorsService);

  function selectorsService(reselect) {
    return {
      activeChannelFilterSelector: activeChannelFilterSelector,
      currentUserIdSelector: currentUserIdSelector,
      channelsSelector: channelsSelector,
      messagesSelector: messagesSelector,
      usersSelector: usersSelector,

      activeMessagesSelector: activeMessagesSelectorFactory()
    };

    /////////////////////
    // Input selectors. /
    /////////////////////
    function activeChannelFilterSelector(state) {
      return state.get('activeChannelFilter');
    }

    function currentUserIdSelector(state) {
      return state.get('currentUserId');
    }

    function channelsSelector(state) {
      return state.get('channels');
    }

    function messagesSelector(state) {
      return state.get('messages');
    }

    function usersSelector(state) {
      return state.get('users');
    }

    ////////////////////////
    // Combined selectors. /
    ////////////////////////
    function activeMessagesSelectorFactory() {
      return reselect.createSelector(
        [
          messagesSelector,
          activeChannelFilterSelector
        ],
        function(messages, activeChannelFilter) {
          return messages.filter(function(message) {
            return message.get('channelId') === activeChannelFilter;
          });
        }
      );
    }
  }
})();
