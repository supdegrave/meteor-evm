currentTeam = null;
Deps.autorun(function() {
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

//Dropdown initializer with a throttle to prevent it being called after each dropdown element is added
Template.userRole.dropdownCaller = _.throttle(function (){
  $('.ui.dropdown.user-role-dropdown').dropdown();
}, 600);

Template.userRole.rendered = function(){
  setSelectedUser();
};