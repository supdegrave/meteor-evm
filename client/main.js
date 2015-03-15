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
    overrideLoginErrors:false,
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
  Meteor.subscribe("skills");
  Meteor.subscribe("userData");
  Meteor.subscribe("allUserData");
});

Avatar.options = {
  fallbackType: "default image",
  gravatarDefault: "identicon"
};

Template.registerHelper("userInScope", function(){
  return Session.get('userInScope');
});
Template.registerHelper("myself", function(){
  return this._id && this._id === Meteor.userId();
});
Template.registerHelper("isUser", function(){
  return !!Meteor.user();
});
Template.registerHelper("getSkills", function(){
  return Skills.find().fetch();
});
Template.registerHelper('formatDateTime', function(momentObj, formatString) {
  var m = (moment.format) ? momentObj : moment(momentObj);
  return m.format(formatString);
});
Template.registerHelper('sameDate', function(start, end) {
  var mStart = (moment.format) ? start : moment(start),
      mEnd   = (moment.format) ? end : moment(end);
  return mStart.date() === mEnd.date();
});

Template.loginDropdown.helpers({
  myID:function(){
    return Meteor.userId();
  }
});