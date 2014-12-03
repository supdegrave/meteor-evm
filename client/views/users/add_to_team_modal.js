
Template.addToTeamModal.helpers({
  userInScope: function() {
    return Session.get('userInScope');
  },
  availableTeams: function() {
    //Returns only the teams the user is not already a member of
    var query = Teams.find({ members: { $nin: [this._id] } },{name:1, members:1});
    return query;
  },
  teamMemberCount: function() {
    return this.members.length;
  },
});

Template.addToTeamModal.rendered = function() { 
  $('#addtoteam.modal').modal({
    transition :'vertical flip',
    onHidden :function(){Session.set("checkedList",null);},
    onApprove : function() {
      var checkedTeams = Session.get("checkedList");
      if (!!checkedTeams){
        for (var i = checkedTeams.length - 1; i >= 0; i--) {
          console.log(checkedTeams[i]);
          Meteor.call('addUserToTeam', Session.get('userInScope')._id, checkedTeams[i], function(err, res) {
            if (res) {
              console.log('add_to_team_modal.js // TODO: add verification after save');
            }
            else if (err) {
              console.log(err);
            }
          });
        };
        Session.set("checkedList",null);
      }
    }
  })
};