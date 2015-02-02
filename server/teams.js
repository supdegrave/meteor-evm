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
    
    // handle missing user
    if (Meteor.users.find({_id: userId}).count() < 1 )
      throw new Meteor.Error(422, 'User #' + userId + ' does not exist.');

    // handle user already in team
    if (Teams.find({_id: teamId, members: {$in: [userId]}}).fetch().length>0)
      throw new Meteor.Error(422, 'User #' + userId+ " already part of team #"+teamId);

    // add the user to the team
    if (canEdit()) {
      return Teams.update({_id: teamId }, {$push: {members: userId}});
    }
  },
  removeUserFromTeam: function(userId, teamId) {

    // handle missing team
    if (Teams.find({_id: teamId}).count() < 1 )
      throw new Meteor.Error(422, 'Team #' + teamId + ' does not exist.');

    // handle missing user
    if (Meteor.users.find({_id: userId}).count() < 1 )
      throw new Meteor.Error(422, 'User #' + userId + ' does not exist.');

    // handle user not in team
    if (Teams.find({_id: teamId, members: {$in: [userId]}}).count() < 1)
      throw new Meteor.Error(422, 'User #' + userId+ " not part of team #"+teamId);

    // add the user to the team
    if (canEdit()) {
      return Teams.update({_id: teamId }, {$pull: {members: userId}});
    }
  },

  // approve a volunteer request (remove from requests array, add to volunteers array)
  approveVolunteerRequest: function(eventId, userId) {
    return Events.update(
      {_id: eventId}, 
      {
        $addToSet: {volunteers: userId}, 
        $pull: {requests: userId}
      }
    );
  },

  // deny a volunteer request (remove from requests array)
  denyVolunteerRequest: function(eventId, userId) {
    return Events.update(
      {_id: eventId}, 
      {$pull: {requests: userId}}
    );
  }  
});