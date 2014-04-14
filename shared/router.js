Router.onData(function(){
  var data = Router.getData();
  if (data) { Session.set('pageData', data); }
});


Router.map(function() {
  // ******************************************** //
  // home, '/' path
  // ******************************************** //
  this.route('home', { path: '/' });
  
  // ******************************************** //
  // all users
  // ******************************************** //
  this.route('users', {
    onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if (!Meteor.user()) {
        console.log('Redirecting');
        this.redirect('home');
      }
    }
  });

  // ******************************************** //
  // admin ui 
  // ******************************************** //
  this.route('admin', {
    onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('redirecting');
        this.redirect('home');
      }
    }
  });

  // ******************************************** //
  // display user by id 
  // ******************************************** //
  this.route('user', {
    path: 'users/:id',
    data: function() {
      return Meteor.users.findOne({_id: this.params.id});
    }
  });
  
  // ******************************************** //
  // display a team by name  
  // ******************************************** //
  this.route('team', {
    path: '/teams/:name',
    data: function () {
      return Teams.findOne({name: this.params.name});
    },
  }) 
});