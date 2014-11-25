// main client-side code file 

AccountsTemplates.configure({
    sendVerificationEmail: true,
    homeRoutePath: '/',
    // Texts
    texts: {
      button: {
          signUp: "Join us"
      },
      socialSignIn: "Sign in",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
          forgotPwd: "I forgot my bloody password. Again."
      },
    },
});
Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Tracker.autorun(function(){
  Meteor.subscribe("teams");
  Meteor.subscribe("events");
  Meteor.subscribe("rotas");
  Meteor.subscribe("userData");
  Meteor.subscribe("allUserData");
})


Template.loginDropdown.helpers({
  myID:function(){
    return Meteor.userId();
  }
});