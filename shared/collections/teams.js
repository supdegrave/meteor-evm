// global Teams collection 
Teams = new Meteor.Collection('teams');

Teams.allow({
  insert: function(userId, doc) {
    return doc && !Teams.find({$eq: {name: doc.name}}).fetch().length;
  }
});

// This throws an error on .publish - moved to server/main.js
// Meteor.publish('teams', function() {
//   return Teams.find();
// });

Team = function(name){ 
  this.name = name.trim(); 
  this.email = this.name.toLowerCase() + "goingnowhere.org";
}

Team.prototype = { 
  name: null, 
  parentId: null,
  email: null,
  owner: null, 
  lead: null, 
  colead: null, 
  mentor: null, 
  members: [], 
}
