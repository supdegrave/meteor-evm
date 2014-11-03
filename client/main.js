// main client-side code file 

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Tracker.autorun(function(){
  Meteor.subscribe("teams");
  Meteor.subscribe("events");
  Meteor.subscribe("userData");
  Meteor.subscribe("allUserData");
})


Template.loginDropdown.helpers({
  myID:function(){
    return Meteor.userId();
  }
});