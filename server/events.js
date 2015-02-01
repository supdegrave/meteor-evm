Meteor.methods({
  addVolunteer: function(eventId, userId, requiresApproval) {
    console.log(eventId, userId);
    return Events.update({_id: eventId}, {$addToSet: {volunteers: userId}});
  },
  addVolunteerRequest: function(eventId, userId, requiresApproval) {
    console.log(eventId, userId);
    return Events.update({_id: eventId}, {$addToSet: {requests: userId}});
  }
})