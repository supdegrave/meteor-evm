Template.manageRequests.events({
  'click a > i.checkmark.icon': function(evt, tmpl) { 
    var eventId = tmpl.data._id, 
        userId  = evt && evt.currentTarget.dataset && evt.currentTarget.dataset.userid;
        
    if (eventId && userId) {
      Meteor.call('approveVolunteerRequest', eventId, userId);
    }
  },

  'click a > i.remove.icon': function(evt, tmpl) { 
    var eventId = tmpl.data._id, 
        userId  = evt && evt.currentTarget.dataset && evt.currentTarget.dataset.userid;
        
    if (eventId && userId) {
      Meteor.call('denyVolunteerRequest', eventId, userId);
    }
  }
});
