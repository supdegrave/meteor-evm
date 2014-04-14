// global Teams collection 
Teams = new Meteor.Collection('teams');

Teams.allow({
  insert: function(userId, doc) {
    return doc && !Teams.find({$eq: {name: doc.name}}).fetch().length;
  }
});

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
