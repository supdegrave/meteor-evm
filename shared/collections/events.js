Events = new Meteor.Collection('events');

Events.allow({
  update: function(userId, doc) {
    var user = (Meteor.user())
      ? Meteor.user()
        : Meteor.users.findOne({_id: userId});
    
    return _.contains(doc.user, user._id);
  },

  insert: function(doc) {
    return doc;
  },
});

Event = function(title, id, start, end, ownerId){ 
  this.title = title.trim(); 
  this.id = id.trim().replace(' ', '_');
  this.start = start; 
  this.end = end;
}
Event.prototype = { 
  id: null,
  title: null, 
  start: null, 
  end: null, 
  volunteers: null,
  teamId: null,
  requiresApproval: null,
  requests: null,
  spacesAvailable: null,
}

Rotas = new Meteor.Collection('rotas');

Rotas.allow({
  // update: function(userId, doc) {
  //   var user = (Meteor.user())
  //     ? Meteor.user()
  //       : Meteor.users.findOne({_id: userId});
  //   
  //   return _.contains(doc.user, user._id);
  // },

  insert: function(doc) {
    return doc;
  },
});

