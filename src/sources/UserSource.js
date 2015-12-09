var UserSource = {
  register: function(email, password) {
    // return $.post("http://graynote.io:8080/users/register",
    //   {
    //     email: email,
    //     password: password
    //   }
    // ).success( function(data) {
    //   console.log("Register Success")
    //   console.log(data)
    // }).fail( function(xhr, status, error) {
    //   console.log("Register Error");
    //   console.log(status);
    //   console.log(error);
    // });
  }
}

module.exports = UserSource;
