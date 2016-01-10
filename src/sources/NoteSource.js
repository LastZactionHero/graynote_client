var Promise = require('promise');
var $ = require('jquery');

var NoteSource = {
  index: function(token, query) {
    return new Promise(function(resolve, reject) {
      var url = API_HOST + '/notes';
      if(query){url += '?q=' + query}

      $.ajax({
        url: url,
        type: 'GET',
        headers: {
          'X-Auth-Token': token
        },
        success: function(data) {
          resolve(data);
        },
        error: function(xhr) {
          var msg = xhr.responseText ? $.parseJSON(xhr.responseText) : 'unknown';
          reject(msg);
        }
      })
    });
  },
  show: function(token, id) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: API_HOST + '/notes/' + id,
        type: 'GET',
        headers: {
          'X-Auth-Token': token
        },
        success: function(data) {
          resolve(data);
        },
        error: function(xhr) {
          var msg = xhr.responseText ? $.parseJSON(xhr.responseText) : 'unknown';
          reject(msg);
        }
      })
    });
  },
  create: function(token, title, body) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: API_HOST + '/notes',
        type: 'POST',
        data: {
          title: title,
          body: body
        },
        headers: {
          'X-Auth-Token': token
        },
        success: function(data) {
          resolve(data);
        },
        error: function(xhr) {
          var msg = xhr.responseText ? $.parseJSON(xhr.responseText) : 'unknown';
          reject(msg);
        }
      });
    });
  },
  update: function(token, id, title, body) {
    return new Promise(function(resolve, reject){
      $.ajax({
        url: API_HOST + '/notes/' + id,
        type: 'PUT',
        data: {
          title: title,
          body: body
        },
        headers: {
          'X-Auth-Token': token
        },
        success: function(data){
          resolve(data);
        },
        error: function(xhr) {
          var msg = xhr.responseText ? $.parseJSON(xhr.responseText) : 'unknown';
          reject(msg);
        }
      });
    });
  },
  delete: function(token, id) {
    return new Promise(function(resolve, reject){
      $.ajax({
        url: API_HOST + '/notes/' + id,
        type: 'DELETE',
        headers: {
          'X-Auth-Token': token
        },
        success: function() {
          resolve(id);
        },
        error: function(xhr) {
          var msg = xhr.responseText ? $.parseJSON(xhr.responseText) : 'unknown';
          reject(msg);
        }
      })
    });
  }  
}

module.exports = NoteSource;
