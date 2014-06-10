currentTeam = null;
Deps.autorun(function() {
  currentTeam = Session.get('currentTeam');
});

Template.userRole.rendered = setSelectedUser;

Template.userRole.helpers({
  users: function() {
    // if current role is 'owner', only return users who are in the 'organizers' role
    // otherwise all users 
    return ("owner" === this.role) 
      ? Roles.getUsersInRole("organizer")
        : Meteor.users.find();
  },
  
  selectedUserName: function(user) {
    if (currentTeam) {
      var user = Meteor.users.findOne({_id: currentTeam[this.role]});
      return (!!user) ? displayName(user) : "none";
    }
  }
});

Template.userRole.events({
  'change select.user-role': function(evt, tmpl) {
    currentTeam[this.role] = evt.target.value || null;
  }
});