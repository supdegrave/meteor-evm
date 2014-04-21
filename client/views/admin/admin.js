// ********************************************* //
// *** addUser Template events & helpers
// ********************************************* //

Template.addUserByEmail.events({
  // enable 'Add User' button if input is valid email address
  'keyup .add-user-input': function(evt, tmpl) {
    var btn   = tmpl.find('.add-user'),
        email = evt.target.value.trim();
    
    if (!email.match(EMAIL_REGEXP) || Meteor.users.find({emails: { $elemMatch: { address: email}}}).count()) {
      btn.classList.add('disabled');
    }
    else {
      btn.classList.remove('disabled');
    }

		if (evt.keyCode === 13 && !!email) {
		  btn.click();
		}
  },
  
  // add new user with email address 
  'click .add-user': function(evt, tmpl) {
    var emailField = tmpl.find('.add-user-input');
    Meteor.call('adminAddUser', emailField.value.trim(), function(err, res) {
      if (err && !res) {
        alert('TODO: handle insert error')
      }
    });
    
    emailField.value = '';
  }
});


// ********************************************* //
// *** addTeam Template events & helpers
// ********************************************* //

Template.addTeam.events({
  // enable 'Add Team' button unless team name already exists 
  'keyup .add-team-input': function(evt, tmpl) {
		var btn  = tmpl.find('.add-team'), 
		    team = evt.target.value.trim();

		if (!team || Teams.find({name: team}).count()) {
			btn.classList.add('disabled');
		} 
		else {
			btn.classList.remove('disabled');
		}

		if (evt.keyCode === 13 && !!team) {
		  btn.click();
		}
  },
  
  // add new team 
  'click .add-team': function(evt, tmpl) {
    var teamField = tmpl.find('.add-team-input');
    Teams.insert(new Team(teamField.value), function(err, res) {
      if (err && !res) {
        alert('TODO: handle insert error')
      }
    });
    teamField.value = '';
  }
});

Template.addTeam.teams = function() {
  return Teams.find();
}
