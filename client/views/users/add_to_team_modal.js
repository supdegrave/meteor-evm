
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
    onShow : function() {
      $('#addtoteam .ui.checkbox').checkbox();
      $('#addtoteam .ui.dropdown').dropdown({
        /*onChange : function(value, text, $choice){
          console.log("onChange text: " +text);
          console.log("onChange value: " +value);
          console.log("onChange $choice: " +$choice);
        },*/
      });
    },
    onApprove : function() {
      var checkedTeams = [];
      $(".addToTeamSelect input[type='checkbox']").each(function(index){
        if($(this).prop("checked")) {
          checkedTeams.push($(this).data("team"));
        }
      })
      if (checkedTeams.length>0){
        window.alert("Implement function to add user to team(s): "+ checkedTeams);
      }
    },
  })
};
