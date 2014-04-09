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