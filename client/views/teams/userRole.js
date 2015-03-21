currentTeam = null;
Tracker.autorun(function() {
  currentTeam = Session.get('currentTeam');
});


Template.userRole.helpers({
  users: function() {
    // if current role is 'owner', only return users who are in the 'organizers' role
    // otherwise all users 
    return ("owner" === this.role) 
      ? Roles.getUsersInRole("organizer")
        : Meteor.users.find();
  },
  selectedUserId: function(user) {
     if (currentTeam) {
      var user = Meteor.users.findOne({_id: currentTeam[this.role]});
      return (!!user) ? user._id : "none";
    }
  },
  
  selectedUserName: function(user) {
    if (currentTeam) {
      var user = Meteor.users.findOne({_id: currentTeam[this.role]});
      return (!!user) ? displayName(user) : "none";
    }
  }
});


Template.userRole.events({
  'change .user-role-input': function(evt, tmpl) {
    currentTeam[this.role] = evt.target.value || null;
  }
});


Template.userRole.rendered = function(){
  setSelectedUser();
};