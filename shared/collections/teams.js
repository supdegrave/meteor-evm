// global Teams collection 
Teams = new Meteor.Collection('teams');

Teams.allow({
  update: function(userId, doc) {
    var user = (Meteor.user())
      ? Meteor.user()
        : Meteor.users.findOne({_id: userId});
    
    return _.contains(user.roles, 'admin')
      || _.contains([doc.owner, doc.lead, doc.colead], user._id);
  },

  insert: function(userId, doc) {
    // console.log(userId, doc);
    return doc && !Teams.find({$eq: {name: doc.name}}).fetch().length;
  },
});

Team = function(name){ 
  this.name = name.trim(); 
  this.email = this.name.toLowerCase() + "@goingnowhere.org";
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
