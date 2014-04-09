// Router.configure({
//   layoutTemplate: 'layout'
// });

Router.map(function() {
  this.route('home', { path: '/' });

  this.route('users', {
    onBeforeAction: function() {
      beforeActionRedirect(!Meteor.user);
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if (!Meteor.user()) {
        console.log('Redirecting');
        this.redirect('home');
      }
    }
  });

  this.route('admin', {
    template: 'accountsAdmin',
    onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('redirecting');
        this.redirect('home');
      }
    }
  });
});