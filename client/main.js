// main client-side code file 

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Deps.autorun(function(){
  Meteor.subscribe("teams");
  Meteor.subscribe("userData");
  Meteor.subscribe("allUserData");
})

Template.loginDropdown.events({
  'click #login-buttons-logout': function() {
    Meteor.logout(function() {
      $("#login-buttons").dropdown("close");
    });
  }
});

Template.loginDropdown.helpers({
  myID:function(){
    return Meteor.userId();
  }
});