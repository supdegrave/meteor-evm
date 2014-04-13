UI.registerHelper('canEdit', function() {
  return Roles.userIsInRole(Meteor.userId(), 'admin') 
    || _.contains([this.owner, this.lead, this.colead], Meteor.userId());
});

UI.registerHelper('displayName', function() {
  return this.username 
          || (this.profile && this.profile.name) 
            || (this.emails && this.emails[0].address);
});

Template.team.helpers({
  getParent: function(parentId) {
    return Teams.findOne({id: parentId});
  },
});

Template.role.helpers({
  users: function() {
    return Meteor.users.find();
  },
});

Template.role.events({
  'DOMNodeInserted select': function(evt) {
    if (this.team) {
      $(evt.target).val(this.team[this.role]);
    }
  }
});

