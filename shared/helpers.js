/*** global helper methods ***/

displayName = function(user) {
  if (!user) { user = this; }
  else if ("string" === typeof user) {
    user = Meteor.users.findOne(
      {_id: user}, 
      {fields: {"emails": 1, "profile": 1, "username": 1}}
    );
  }
  
  if (user) {
    return user.username 
        || (user.profile && user.profile.name) 
        || (user.emails && user.emails[0].address);
  }
}
UI.registerHelper('displayName', displayName);

canEdit = function() {
  if (Meteor.user()) {
    return _.intersection(Meteor.user().roles, ['admin', 'organizer']).length 
      || _.contains([this.owner, this.lead, this.colead], Meteor.userId());
  }
}
UI.registerHelper('canEdit', function() {
  return !Meteor.loggingIn() && canEdit();
});
