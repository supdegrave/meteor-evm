// main client-side code file 

AccountsTemplates.configure({
    sendVerificationEmail: true,
    enablePasswordChange: true,
    showForgotPasswordLink: true,
    homeRoutePath: '/dashboard',
    continuousValidation: true,
    negativeFeedback: true,
    positiveFeedback: true,
    negativeValidation: true,
    positiveValidation: true,
    showValidating: true,
    // Texts
    texts: {
      button: {
          signUp: "Click to sign your soul away",
      },
      signInLink_pre: "Have I seen you before?",
      signInLink_link: "Welcome back!",
      signUpLink_pre: "Are you new here?",
      signUpLink_link: "Join us!",
      socialIcons: {
          "meteor-developer": "fa fa-rocket"
      },
      title: {
        forgotPwd: "I forgot my bloody password. Again.",
        signIn: "Welcome back!",
        signUp: "Join us!",
        changePwd: "Change that #!%µù$/¤§ password",
      },
      errors: {
        mustBeLoggedIn: "Sorry, mate. You need to sign in or register to come in.",
      },
    },
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