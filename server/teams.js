Meteor.methods({
  teamSave: function(doc) {
    if (canEdit()) {
      return Teams.update({_id: doc._id}, doc);
    }
  },
  addUserToTeam: function(userId, teamId) {

    // handle missing team
    if (Teams.find({_id: teamId}).count() < 1 )
      throw new Meteor.Error(422, 'Team #' + teamId + ' does not exist.');

    // handle user already in team
    if (Teams.find({_id: teamId, members: {$in: [userId]}}).fetch().length>0)
      throw new Meteor.Error(422, 'User #' + userId+ " already part of team #"+teamId);

    // add the user to the team
    if (canEdit()) {
      return Teams.update({_id: teamId }, {$push: {members: userId}});
    }
  },
});