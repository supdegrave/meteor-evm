Router.configure({
  loadingTemplate: 'loading',
  fastRender: true,
});

Router.onBeforeAction(function() {
  /*if (!Meteor.user() && !Meteor.loggingIn()) {
    console.log('Redirecting');
    this.redirect('home');
  }*/
  AccountsEntry.signInRequired(this);
}, {except: ['org', 'home', 'entrySignIn']});

Router.map(function() {
  // *** home, '/' path ************************* //
  this.route('home', {
    path: '/',
    onBeforeAction: function() {
      if (Meteor.userId()) {
        this.redirect('dashboard');
      }
    }
  });
  // *** dashboard ************************* //
  this.route('dashboard', {
    waitOn: function(){
      Events.find();
    }
  });

  // *** admin ui ******************************* //
  this.route('admin', {
    onBeforeAction: function() {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin', 'organizer'])) {
        console.log('redirecting');
        this.redirect('dashboard');
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
  });

  // *** display user by id ********************* //
  this.route('user', {
    path: '/users/:id',
    data: function() {
      if (Meteor.user()) {
        return Meteor.users.findOne({_id: this.params.id});
      }
    }
  });
  
  // *** display team by name ******************* //
  this.route('team', {
    path: '/teams/:name/:id',
    waitOn: function() {
      Session.set('currentTeam', Teams.findOne({_id: this.params.id}));
    },
    data: function() {
      return Teams.findOne({_id: this.params.id});
    },
  });
  
  // *** display org chart ********************** //
  this.route('org', 
  {
    data: function () {
      var organizers = Roles.getUsersInRole("organizer").fetch();
      
      // consider storing teams collection directly on users in organizers role
      // rather than requiring n+1 queries (where n = organizers.count)
      
      // what to do when we get to sub-teams? 
      // in this case, team owner will likely not be in 'organizer' role
      
      _.each(organizers, function(org) { 
        org.teams = (Teams.find({owner: org._id, parentId: null}).fetch());
      });
      
      // what to do about teams without assigned owners? 
      
      // option 0: 
      // - don't allow creation of teams without owner set 
      
      // option Q: 
      // - list all teams without owners on org chart page as well
      // return {organizers: organizers, unownedTeams: (find teams without owner) }
      // then in organizers.html 
      // {{#with this.organizers}}...{{/with}} 
      // ... 
      // {{#with this.unownedTeams}}...{{/with}}


      return organizers;
    }
  });
});