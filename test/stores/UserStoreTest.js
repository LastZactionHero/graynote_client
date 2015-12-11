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
});
