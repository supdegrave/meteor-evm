Template.listUsers.helpers({
  users: function() {
    var userFilter = Session.get("userFilter"), 
        teamFilter = Session.get("teamFilter"), 
        query      = {}, 
        userQuery  = teamQuery = null;

    if (!!userFilter) {
      var userFilterOptions = {$regex: userFilter, $options: 'i'};
      userQuery = {
      	$or: [
      		{'profile.name': userFilterOptions},
      		{'emails.address': userFilterOptions},
      		{'username': userFilterOptions},
      	]
      };
    }

    if (teamFilter && teamFilter.length > 0) {
      var teams = Teams
        .find({name: {$in: teamFilter}})
        .fetch()
        .map(function(team) { 
          return team.members; 
        });

      teamQuery = {_id: {$in: _.uniq(_.flatten(teams))}};
    };

    if (userQuery && teamQuery) { query = {$and: [userQuery, teamQuery]}; }
    else if (userQuery) { query = userQuery; }
    else if (teamQuery) { query = teamQuery; }

    return Meteor.users.find(query);
  },

  myself: function() {
    return Meteor.userId() === this._id;
  },

  isOrganizer: function() {
    return Roles.userIsInRole(this._id, "organizer");
  }, 

  memberOfTeams: function() {
    return Teams.find({members: {$in: [this._id]}}, {name: 1});
  }
});

Template.listUsers.events({
  'click .userLink': function(event, template) {
    Session.set('userInScope', this);
    $('#userprofile.modal').modal('toggle');
  }   
});

