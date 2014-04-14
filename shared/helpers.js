// global helper methods 

UI.registerHelper('canEdit', function() {
  return Roles.userIsInRole(Meteor.userId(), 'admin') 
    || _.contains([this.owner, this.lead, this.colead], Meteor.userId());
});

UI.registerHelper('displayName', displayName);

