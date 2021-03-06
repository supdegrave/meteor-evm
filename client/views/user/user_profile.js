var modalContent;

Template.userProfile.events({
  'click .modalCallButton': function(event, template) {
      Session.set('userInScope', this);
      var modalTarget = $(event.currentTarget).data("target");
      $(modalTarget).modal('show');
    },
  'click .deleteSkill': function(event, template) {
      Meteor.users.update(Meteor.userId(), { $pull: { "profile.skills": this }});
    },
});

Template.userProfile.rendered = function() {
  modalContent = document.getElementById('modalContent');
      console.log('url:', Avatar.getUrl());

};


Template.userProfile.helpers ({
  editing :function(){
    return Session.get('editProfile');
  }
})