function displayName(user) {
  if (!user) { user = this; }
  
  return user.username 
          || (user.profile && user.profile.name) 
            || (user.emails && user.emails[0].address);
}

UI.registerHelper('canEdit', function() {
  return Roles.userIsInRole(Meteor.userId(), 'admin') 
    || _.contains([this.owner, this.lead, this.colead], Meteor.userId());
});

UI.registerHelper('displayName', displayName);

Template.team.helpers({
  getParent: function(parentId) {
    return Teams.findOne({id: parentId});
  },
});

Template.role.helpers({
  users: function() {
    return Meteor.users.find();
  },
  selectedUser: function() {
    if (this.team)
    {
      var user = Meteor.users.findOne({_id: this.team[this.role]});
      return displayName(user) || "none";
    } 
  }
});

Template.role.events({
  'DOMNodeInserted select': function(evt) {
    if (this.team) {
      $(evt.target).val(this.team[this.role]);
    }
  }
});