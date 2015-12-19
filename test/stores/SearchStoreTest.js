/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/alt';
import wrappedSearchStore, {SearchStore} from 'stores/SearchStore';
import searchActions from 'actions/SearchActions';

import AltTestingUtils from 'alt/utils/AltTestingUtils';

describe('SearchStore', function(){

  it('listens for updateQuery action', function(){
    var action = searchActions.UPDATE_QUERY;
    var data = "q";
    alt.dispatcher.dispatch({action, data});
    expect(wrappedSearchStore.getState().query).to.eql(data);
  });

  it('listens for clearQuery action', function(){
    var action = searchActions.CLEAR_QUERY;
    alt.dispatcher.dispatch({action});
    expect(wrappedSearchStore.getState().query).to.eql(null);
  });

});
