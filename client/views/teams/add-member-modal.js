var currentTeam = null; 

Tracker.autorun(function() {
  currentTeam = Session.get('currentTeam');
});

Template.addMemberModal.rendered = function() {
  $('.modal').modal('setting', 'transition', 'vertical flip');
}

Template.addMemberModal.helpers({
  currentTeam: currentTeam, 
  
  possibleMembers: function() {
    return Meteor.users.find( {_id: {$nin: currentTeam.members}} );
  }
})