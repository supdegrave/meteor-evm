Template.addUserByEmail.events({
  // enable 'Add User' button if input is valid email address
  'keyup #adminAddUserEmail': function(evt, tmpl) {
    var btn         = tmpl.find('#adminAddUser'),
        email       = evt.target.value;
        
    btn.disabled = !email.match(EMAIL_REGEXP); 
  },
  
  // add new user with email address 
  'click #adminAddUser': function(evt, tmpl) {
    var emailField = tmpl.find('#adminAddUserEmail');
    Meteor.call('adminAddUser', emailField.value);
    emailField.value = '';
  }
});
