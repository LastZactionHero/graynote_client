/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/alt'
import wrappedUserStore, {UserStore} from 'stores/UserStore'
import userActions from 'actions/UserActions'

// These testing utils will auto stub the stuff that alt.createStore does
import AltTestingUtils from 'alt/utils/AltTestingUtils';

describe("UserStore", () => {
  var store = {};
  beforeEach(function(){
    sinon.stub(localStorage, 'setItem', function(key, value){
      store[key] = value
    })
    sinon.stub(localStorage, 'getItem', function(key) {
      return store[key]
    });
  });

  afterEach(function(){
      localStorage.setItem.restore();
      localStorage.getItem.restore();
  });

  it("listens for update logged in action", () => {
    var oldToken = wrappedUserStore.getState().token;

    var action = userActions.UPDATE_LOGGED_IN;
    var data = 'abc123';

    alt.dispatcher.dispatch({action, data});
    expect(wrappedUserStore.getState().token).to.equal(data)
  });

  it("listens for update registration failed action", () => {
    var action = userActions.UPDATE_REGISTRATION_FAILED;
    var data = {errors: {email: ["invalid"]}}

    alt.dispatcher.dispatch({action, data});
    expect(wrappedUserStore.getState().error).to.equal(data)
  });

  it("listens for update login failed action", () => {
    var action = userActions.UPDATE_LOGIN_FAILED;
    var data = {errors: {email: ["not found"]}}

    alt.dispatcher.dispatch({action, data});
    expect(wrappedUserStore.getState().error).to.equal(data)
  });

  it("saves the token locally", () => {
    var oldToken = wrappedUserStore.getState().token;

    var action = userActions.UPDATE_LOGGED_IN;
    var data = 'abc123';

    alt.dispatcher.dispatch({action, data});
    expect(store.token).to.equal(data)
  });

  it('listens for log out action', function(){
    var action = userActions.LOG_OUT;
    alt.dispatcher.dispatch({action});
    expect(wrappedUserStore.getState().token).to.equal(null);
  });

});
