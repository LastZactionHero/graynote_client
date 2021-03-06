var Promise = require('promise');
var $;
$ = require('jquery');

var UserSource = {
  register: function(email, password) {
    return new Promise(function (resolve, reject) {
      $.post(API_HOST + '/users/register',
        {
          email: email,
          password: password
        }).success( function(data) {
          resolve(data)
        }).fail( function(xhr) {
          var msg = xhr.responseText ? $.parseJSON(xhr.responseText) : 'unknown'
          reject(msg)
        });
    });
  },
  login: function(email, password) {
    return new Promise(function (resolve, reject) {
      $.post(API_HOST + '/users/login',
        {
          email: email,
          password: password
        }).success( function(data) {
          resolve(data)
        }).fail( function(xhr) {
          var msg = xhr.responseText ? $.parseJSON(xhr.responseText) : 'unknown'
          reject(msg)
        });
    });
  }
}

module.exports = UserSource;
