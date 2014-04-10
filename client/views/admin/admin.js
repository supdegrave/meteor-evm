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
    Meteor.call('adminAddUser', emailField.value.trim());
    // TODO: handle insert error
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
    Teams.insert({name: teamField.value});
    // TODO: handle insert error
    teamField.value = '';
  }
});

Template.addTeam.teams = function() {
  return Teams.find();
}


// ********************************************* //
// *** addRole Template events & helpers
// ********************************************* //

Template.addRole.events({
	'click .add-role': function(evt, tmpl) {
		var input = tmpl.find('.add-role-input'), 
		    role  = input.value.trim();

		Meteor.call('addRole', role, function(error) {
			if (error) { // optionally use a meteor errors package
				if (typeof Errors === "undefined") {
					Log.error('Error: ' + error.reason);
				}
				else {
					Errors.throw(error.reason);
				}
			}
			else {
  			input.value = "";
			}
		});
	},

  // 'click .remove-role' : function(event, template) {
  //  var role = this.name;
  // 
  //  Meteor.call('removeRole', role, function(error) {
  //    if (error) {
  //      // optionally use a meteor errors package
  //      if (typeof Errors === "undefined")
  //        Log.error('Error: ' + error.reason);
  //      else {
  //        Errors.throw(error.reason);
  //      }
  //    }
  //  });
  // },

	'keyup .add-role-input': function(evt, tmpl) {
		var btn  = tmpl.find('.add-role'),
		    role = evt.target.value.trim();

		if (!role || Meteor.roles.find({name: role}).count()) {
			btn.classList.add('disabled');
		} 
		else {
			btn.classList.remove('disabled');
		}

		if (evt.keyCode === 13 && !!role) {
		  btn.click();
		}
	}
});


Template.addRole.roles = function() {
  return Roles.getAllRoles();
}