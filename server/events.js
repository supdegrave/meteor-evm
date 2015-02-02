Meteor.methods({
  // add user to an event's volunteer array 
  addVolunteer: function(eventId, userId) {
    return Events.update({_id: eventId}, {$addToSet: {volunteers: userId}});
  },

  // add user to an event's requests array (for events which require approval)
  addVolunteerRequest: function(eventId, userId) {
    return Events.update({_id: eventId}, {$addToSet: {requests: userId}});
  }
})