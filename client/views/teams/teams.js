pageData = Session.get('pageData');

function displayName(user) {
  if (!user) { user = this; }
  
  return user.username 
      || (user.profile && user.profile.name) 
      || (user.emails && user.emails[0].address);
}

Template.team.helpers({
  getParent: function(parentId) {
    return Teams.findOne({_id: parentId});
  },
});

Template.roleTemplate.helpers({
  users: function() {
    return Meteor.users.find();
  },
  
  selectedUserName: function() {
    var user = Meteor.users.findOne({_id: pageData[this.role]});
    return (!!user) ? displayName(user) : "none";
  }
});

Template.roleTemplate.events({
  'DOMNodeInserted select': function(evt) {
    if (pageData) {
      $(evt.target).val(pageData[this.role]);
    }
  }
});