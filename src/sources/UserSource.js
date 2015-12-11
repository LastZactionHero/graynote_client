var Promise = require('promise');
var $;
$ = require('jquery');

var UserSource = {
  hello: function(){
    return true;
  },
  register: function(email, password) {
    return new Promise(function (resolve, reject) {
      $.post("http://graynote.io:8181/users/register",
        {
          email: email,
          password: password
        }).success( function(data) {
          console.log(data.token)
          resolve(data)
        }).fail( function(xhr, status, error) {
          var msg = xhr.responseText ? $.parseJSON(xhr.responseText) : "unknown"
          reject(msg)
        });
    });
  }
}

module.exports = UserSource;
