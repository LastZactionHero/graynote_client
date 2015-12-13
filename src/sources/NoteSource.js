var Promise = require('promise');
var $ = require('jquery');

var NoteSource = {
  index: function(token) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: 'http://graynote.io:8181/notes',
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
        url: 'http://graynote.io:8181/notes/' + id,
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
        url: 'http://graynote.io:8181/notes',
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
        url: 'http://graynote.io:8181/notes/' + id,
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
  }
}

module.exports = NoteSource;
