var Promise = require('promise');
var $;
$ = require('jquery');

var UserSource = {
  hello: function(){
    return true;
  },
  register: function(email, password) {
    return new Promise(function (resolve, reject) {
        $.post("http://graynote.io:8080/users/register",
          {
            email: email,
            password: password
          }).success( function(data) {
            resolve(data)
          }).fail( function(xhr, status, error) {
            reject($.parseJSON(xhr.responseText))
          });
    });
  }
}

module.exports = UserSource;
