var Promise = require('promise');
var $ = require('jquery');

var ShareSource = {
  create: function(token, note) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: API_HOST + '/shares',
        type: 'POST',
        data: {
          note_id: note.id
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
  delete: function(token, share){
    return new Promise(function(resolve, reject){
      $.ajax({
        url: API_HOST + '/shares/' + share.auth_key,
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

module.exports = ShareSource;
