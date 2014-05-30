Router.configure({
  loadingTemplate: 'loading'
});

Router.map(function() {
  // *** home, '/' path ************************* //
  this.route('home', { path: '/' });

  // *** admin ui ******************************* //
  this.route('admin', {
    onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
        console.log('redirecting');
        this.redirect('home');
      }
    },
    waitOn: function() {
      UserDataRestrictions.findOne();
    }
  });
  
  // *** all users ****************************** //
  this.route('users', {
    waitOn: function() {
      Session.set('userFilter', null);
      Session.set('teamFilter', null);
    },
    onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } 
      else if (!Meteor.user()) {
        console.log('Redirecting');
        this.redirect('home');
      }
    }, 
  });

  // *** display user by id ********************* //
  this.route('user', {
    path: '/users/:id',
    data: function() {
      return Meteor.users.findOne({_id: this.params.id});
    }
  });
  // *** display team by name ******************* //
  this.route('team', {
    path: '/teams/:name',
    waitOn: function() {
      Session.set('currentTeam', Teams.findOne({name: this.params.name}));
    },
    data: function() {
      return Teams.findOne({name: this.params.name});
    },
  });
  
  // *** display org chart ********************** //
  this.route('org', 
  {
    data: function () {
      var organizers = Roles.getUsersInRole("organizer").fetch()
      
      _.each(organizers, function(org) { 
        org.teams = (Teams.find({owner: org._id}).fetch());
      });

      return organizers;
    }
  });
});