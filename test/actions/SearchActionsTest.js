/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import alt from 'components/alt';
import searchActions from 'actions/SearchActions';

describe('SearchActions', function(){
  var dispatcherSpy = null;

  beforeEach(function(){
    dispatcherSpy = sinon.spy(alt.dispatcher, 'dispatch');
  });
  afterEach(function(){
    alt.dispatcher.dispatch.restore();
  });

  describe('updateQuery', function(){

    it('dispatches updateQuery', function(){
      var q = "Hello world!"
      searchActions.updateQuery(q)
      expect(dispatcherSpy.args[0][0].type).to.equal('SearchActions.updateQuery')
      expect(dispatcherSpy.args[0][0].payload).to.equal(q)
    });

  });

  describe('clearQuery', function(){

    it('dispatches clearQuery', function(){
      searchActions.clearQuery();
      expect(dispatcherSpy.args[0][0].type).to.equal('SearchActions.clearQuery');
    });

  });

});
