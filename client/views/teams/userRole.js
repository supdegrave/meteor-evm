currentTeam = null;
Deps.autorun(function() {
  currentTeam = Session.get('currentTeam');
});

Template.userRole.rendered = setSelectedUser;

Template.userRole.helpers({
  users: function() {
    var users = Meteor.users.find().fetch();
    return ("owner" === this.role) 
      ? _.where(users, {organizer: true})
        : users;
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
    var target = evt.target, 
        role   = $(target).data('role');
        
    if (currentTeam) {
      currentTeam[role] = target.value;
    }
  }
});