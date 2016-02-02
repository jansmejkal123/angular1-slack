(function() {
  'use strict';

  angular
    .module('app.chat')
    .factory('storeService', storeService);

  function storeService(reduxService, _) {
    var store;
    var initialState = {
      activeChannelFilter: 1,
      channels: [
        {id: 1, name: 'channel 1'},
        {id: 2, name: 'channel 2'},
        {id: 3, name: 'channel 3'},
        {id: 4, name: 'channel 4'}
      ],
      users: [
        {id: 1, name: 'Jiri Vopolka'},
        {id: 2, name: 'Vladimir Gorej'}
      ],
      messages: [
        {id: 0, channelId: 1, userId: 1, body: 'message body 1'},
        {id: 1, channelId: 1, userId: 2, body: 'message body 2'},
        {id: 2, channelId: 1, userId: 1, body: 'message body 3'}
      ]
    };

    store = reduxService.createStore(combineReducersFactory(), initialState);
    return store;

    //////////////
    // Reducers //
    //////////////
    function activeChannelFilter(state, action) {
      switch (action.type) {
        case 'channel.setActive': {
          return action.payload.activeChannelId;
        }
        default: {
          return (typeof state === 'undefined') ? 1 : state;
        }
      }
    }

    function channels(state, action) {
      var channel;
      var index;

      switch (action.type) {
        case 'channel.setName': {
          index = _.findIndex(state, {'id': action.payload.id});
          channel = state[index];
          channel = angular.extend({}, channel, {name: action.payload.name});
          state.splice(index, 1, channel);
          return state.slice();
        }
        default: {
          return (typeof state === 'undefined') ? [] : state;
        }
      }
    }

    function users(state, action) {
      switch (action.type) {
        default: {
          return (typeof state === 'undefined') ? [] : state;
        }
      }
    }

    function messages(state, action) {
      switch (action.type) {
        default: {
          return (typeof state === 'undefined') ? [] : state;
        }
      }
    }

    function combineReducersFactory() {
      return reduxService.combineReducers({
        activeChannelFilter: activeChannelFilter,
        channels: channels,
        users: users,
        messages: messages
      });
    }
  }
})();