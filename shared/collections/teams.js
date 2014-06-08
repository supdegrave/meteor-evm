// global Teams collection 
Teams = new Meteor.Collection('teams');

TEAM_ROLES = [
  { name: 'owner', label: 'Owner', addToRoles: true },
  { name: 'lead', label: 'Lead', addToRoles: true },
  { name: 'colead', label: 'Co-Lead', addToRoles: true },
  { name: 'mentor', label: 'Mentor', addToRoles: false }
];


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

Team = function(name, ownerId){ 
  this.name = name.trim(); 
  this.email = this.name.toLowerCase().replace(' ', '_') + "@goingnowhere.org";
  
  // add team-specific roles to team
  // and insert in Roles collection if roles.addToRoles
  _.each(TEAM_ROLES, function(role) {
    this[role.name] = null;

    if (role.addToRoles) {
      Meteor.call("addRole", this.name + " " + role.label);
    }
  }, this);
  
  // if no owner is passed, assign current user
  this.owner = !!ownerId
    ? ownerId
      : Meteor.userId();
}

Team.prototype = { 
  name: null, 
  parentId: null,
  email: null,
  members: [] 
}
