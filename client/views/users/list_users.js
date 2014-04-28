Template.listUsers.helpers({
  users: function() {
    return filteredUserQuery(Meteor.userId(), Session.get("userFilter"));
  },
  myself: function(userId) {
    return Meteor.userId() === userId;
  },
  isOrganizer: function() {
    return this.organizer;
  }, 
  memberOfTeams: function(userId) {
    return Teams.find({members:{$in: [this._id]}},{name:1});
  }
});

Template.listUsers.events({
  'click .userLink': function(event, template) {
    Session.set('userInScope', this);
  }   
});

Template.listUsers.rendered = function() {
   
};
