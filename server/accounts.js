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
  },
  resetPassword: {
    subject: function () {
      return "So you forgot your password, huh? — Nowhere Volunteer Manager";
    },
    text: function (user, url) {
      return "Hey there! So you've had one drink too many, \
or you've been distracted by a passing muse, \
and you forgot your password. It happens to the best of us. \
Go on and click this link to make it all better: \r\n"
        + url +
"\r\n\r\nThat being said, if you didn't ask fo anything, \
then someone else might be trying access your account. \
Why the hell would someone do that? \
Sign you up for shifts? \
\r\nPlease send us an e-mail at volunteers@goingnowhere.org \
if that is the case, and we will track the baddies !"
        + "\r\n\r\nThanks! \r\n-Nowhere Volunteers"
    }
  },
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