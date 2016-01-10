var Promise = require('promise');
var $ = require('jquery');

var ShareSource = {
  create: function(token, note, permissions) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        url: API_HOST + '/shares',
        type: 'POST',
        data: {
          note_id: note.id,
          permissions: permissions
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
          resolve(share);
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
