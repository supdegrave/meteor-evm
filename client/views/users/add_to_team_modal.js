
Template.addToTeamModal.helpers({
  userInScope: function() {
    return Session.get('userInScope');
  },
  availableTeams: function() {
    //Returns only the teams the user is not already a member of
    var query = Teams.find({ members: { $nin: [this._id] } },{name:1, members:1});
    // Hacky way of making sure the checkbox init is launched after a team is added to the list.
    setTimeout(function(){$('#addtoteam .ui.checkbox').checkbox('behavior','uncheck')},500);
    return query;
  },
  teamMemberCount: function() {
    return this.members.length;
  },
});

Template.addToTeamModal.rendered = function() { 
  $('#addtoteam.modal').modal({
    transition :'vertical flip',
    onApprove : function() {
      var checkedTeams = [];
      $(".addToTeamSelect input[type='checkbox']").each(function(index){
        if($(this).prop("checked")) {
          checkedTeams.push($(this).data("teamid"));
        }
      })
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
    }
  })
};
