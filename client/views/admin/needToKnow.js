Template.needToKnowModal.events( {
  'show.bs.modal #needtoknow': function(evt, tmpl) {
    console.log(evt.relatedTarget.dataset.property);
  },
  
  // 'click .add-team': function(evt, tmpl) {
  //   var teamField = tmpl.find('.add-team-input');
  //       Teams.insert(new Team(teamField.value, teamField.dataset.ownerid), function(err, res) {
  //     if (err && !res) {
  //       alert('TODO: handle insert error')
  //     }
  //   });
  //   teamField.value = '';
  // }
})

Template.needToKnow.helpers({
  restrictedFields: function() {
    return UserDataRestrictions.find();
  }
});