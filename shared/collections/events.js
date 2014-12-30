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

Event = function(eventProps, start, end) { 
  this.title            = eventProps.name.trim(); 
  this.teamId           = eventProps.teamId;
  this.id               = this.teamId + '_' + this.title.replace(' ', '_');
  this.start            = start || new Date(eventProps.startDate + ' ' + eventProps.startTime); 
  this.end              = end || new Date(eventProps.endDate + ' ' + eventProps.endTime);
  this.requiresApproval = !!eventProps.requiresApproval;
  this.spacesAvailable  = eventProps.numVolunteers;
}
Event.prototype = { 
  id: null,
  title: null, 
  start: null, 
  end: null, 
  teamId: null,
  requiresApproval: null,
  spacesAvailable: null,
  volunteers: [], // array of simple user objects, to simplify display = {_id = int, name = string }
  requests: [],   // array of userId integers
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
    // TODO: disallow duplicate name (or perhaps id)
    return doc;
  },
});

