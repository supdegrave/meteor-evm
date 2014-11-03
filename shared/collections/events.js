Events = new Meteor.Collection('events');

Events.allow({
  update: function(userId, doc) {
    var user = (Meteor.user())
      ? Meteor.user()
        : Meteor.users.findOne({_id: userId});
    
    return _.contains(doc.user, user._id);
  },

  insert: function(userId, doc) {
    // console.log(userId, doc);
    return doc ;
  },

});

Event = function(name, ownerId){ 
  this.title = title.trim(); 
}
Event.prototype = { 
  id: null,
  title: null, 
  start: null, 
  end: null, 
  users: null,
  teamId: null,
  requiresApproval: null,
  requests: null,
  spacesAvailable: null,
}
