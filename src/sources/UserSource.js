var Promise = require('promise');
var $;
$ = require('jquery');

var UserSource = {
  register: function(email, password) {
    return new Promise(function (resolve, reject) {
      $.post('http://graynote.io:8181/users/register',
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
      $.post('http://graynote.io:8181/users/login',
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
