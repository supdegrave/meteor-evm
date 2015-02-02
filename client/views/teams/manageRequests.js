Template.manageRequests.events({
  // approve volunteer request to join a shift
  'click a > i.checkmark.icon': function(evt, tmpl) { 
    var eventId = tmpl.data._id, 
        userId  = evt && evt.currentTarget.dataset && evt.currentTarget.dataset.userid;
        
    if (eventId && userId) {
      Meteor.call('approveVolunteerRequest', eventId, userId);
    }
  },

  // deny volunteer request to join a shift
  'click a > i.remove.icon': function(evt, tmpl) { 
    var eventId = tmpl.data._id, 
        userId  = evt && evt.currentTarget.dataset && evt.currentTarget.dataset.userid;
        
    if (eventId && userId) {
      Meteor.call('denyVolunteerRequest', eventId, userId);
    }
  },
  
  // show user profile modal dialog
  'click .modalCallButton': function(evt, tmpl) {
    var userId      = evt && evt.currentTarget.dataset && evt.currentTarget.dataset.userid,
        modalTarget = $(evt.currentTarget).data("target");
        
    if (userId && modalTarget) {
      Session.set('userInScope', Meteor.users.findOne(userId));
      $(modalTarget).modal('show');
    }
  }
});
