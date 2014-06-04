Accounts.emailTemplates = {
  siteName: "Nowhere Volunteer Manager",
  from: "Nowhere Volunteers <volunteers@goingnowhere.org>",
  enrollAccount: {
    subject: function () {
      return "Welcome to the new Nowhere Volunteer Manager";
    },
    text: function (user, url) {
      return "Howdy! You've been invited to the new Nowhere Volunteer Manager \
app, which will make it easier to recruit and manage teams to build and run \
Nowhere. \r\n\r\nTo join, please click the link below and fill out your \
volunteer profile. \r\n\r\n"
        + url
        + "\r\n\r\nThanks! \r\n-Nowhere Volunteers"
    }
  }
}; 

Accounts.onLogin(function(loginAttempt) {
  if (firstLogin(loginAttempt)) {
    // see https://github.com/EventedMind/iron-router/blob/dev/DOCS.md#server-side-routing
  }
});

function firstLogin(loginAttempt) {
  return loginAttempt 
      && loginAttempt.user
      && loginAttempt.user.services 
      && loginAttempt.user.services.resume 
      && loginAttempt.user.services.resume.loginTokens 
      && loginAttempt.user.services.resume.loginTokens.length === 0;
}