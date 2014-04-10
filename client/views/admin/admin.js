Template.addUserByEmail.events({
  // enable 'Add User' button if input is valid email address
  'keyup .add-user-input': function(evt, tmpl) {
    var btn   = tmpl.find('.add-user-input'),
        email = evt.target.value;
        
    btn.disabled = !email.match(EMAIL_REGEXP); 
  },
  
  // add new user with email address 
  'click .add-user': function(evt, tmpl) {
    var emailField = tmpl.find('.add-user');
    Meteor.call('adminAddUser', emailField.value);
    emailField.value = '';
  }
});

Template.addTeam.events({
  // enable 'Add Team' button unless team name already exists 
  'keyup .add-team-input': function(evt, tmpl) {
    var btn      = tmpl.find('#adminAddTeamSubmit'),
        teamName = evt.target.value;
    
    // non-zero-length name, and name doesn't already exist 
    btn.disabled = !teamName.length || !!Teams.find({name: teamName.trim()}).fetch().length; 
  },
  
  // add new team 
  'click .add-team': function(evt, tmpl) {
    var teamField = tmpl.find('.add-team-input');
    Teams.insert({name: teamField.value});
    teamField.value = '';
  }
});

Template.addTeam.teams = function() {
  return Teams.find();
}

Template.addRole.events({
	'click .add-role': function(event, template) {
		var role = template.find('.add-role-input').value;
		Meteor.call('addRole', role, function(error) {
			if (error) {
				// optionally use a meteor errors package
				if (typeof Errors === "undefined")
					Log.error('Error: ' + error.reason);
				else {
					Errors.throw(error.reason);
				}
			}
			template.find('.add-role-input').value = "";
		});
	},

	'click .remove-role' : function(event, template) {
		var role = this.name;

		Meteor.call('removeRole', role, function(error) {
			if (error) {
				// optionally use a meteor errors package
				if (typeof Errors === "undefined")
					Log.error('Error: ' + error.reason);
				else {
					Errors.throw(error.reason);
				}
			}
		});
	},

	'keyup .add-role-input': function(event, template) {
		var buttonElement = template.find('.add-role');
		var role = template.find('.add-role-input').value;
		if (!role) {
			buttonElement.classList.add('disabled');
		} else {
			buttonElement.classList.remove('disabled');
		}

		if (event.keyCode === 13 && !!role) {
			Meteor.call('addRole', role, function(error) {
				if (error) {
					// optionally use a meteor errors package
					if (typeof Errors === "undefined")
						Log.error('Error: ' + error.reason);
					else {
						Errors.throw(error.reason);
					}
				}
				template.find('.add-role-input').value = "";
				buttonElement.classList.add('disabled');
			});
		}
	}
});



Template.addRole.roles = function() {
  return Roles.getAllRoles();
}