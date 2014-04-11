Template.team.helpers({
  getParent: function(parentId) {
    return Teams.findOne({id: parentId});
  },
});

UI.registerHelper('canEdit', function() {
  return Roles.userIsInRole(Meteor.userId(), 'admin') 
    || _.contains([this.owner, this.lead, this.colead], Meteor.userId());
});

UI.registerHelper('users', function(role) {
  return Meteor.users.find().fetch().map(function(user) {
    if (user._id === this[role]) { 
      user["is_" + role] = true;
    }
    return user;
  }, this);
});

UI.registerHelper('displayName', function() {
  // var user = Meteor.users.findOne({_id: userId}) || this;
  // if (userId) { console.log(Meteor.users.findOne({_id: userId})); }
  // else { console.log(this); }
  
  console.log(this);
  return (this.thisname || this.profile && this.profile.name) || this.emails[0].address;
});