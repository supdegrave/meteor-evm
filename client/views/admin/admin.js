Template.addUserByEmail.events({
  // enable 'Add User' button if input is valid email address
  'keyup #adminAddUserEmail': function(evt, tmpl) {
    var btn   = tmpl.find('#adminAddUserSubmit'),
        email = evt.target.value;
        
    btn.disabled = !email.match(EMAIL_REGEXP); 
  },
  
  // add new user with email address 
  'click #adminAddUserSubmit': function(evt, tmpl) {
    var emailField = tmpl.find('#adminAddUserEmail');
    Meteor.call('adminAddUser', emailField.value);
    emailField.value = '';
  }
});

Template.addTeam.events({
  // enable 'Add Team' button
  'keyup #adminAddTeam': function(evt, tmpl) {
    var btn      = tmpl.find('#adminAddTeamSubmit'),
        teamName = evt.target.value;
    
    // non-zero-length name, and name doesn't already exist 
    btn.disabled = !teamName.length || !!Teams.find({name: teamName.trim()}).fetch().length; 
  },
  
  // add new team 
  'click #adminAddTeamSubmit': function(evt, tmpl) {
    var teamField = tmpl.find('#adminAddTeam');

    Teams.insert({
      name: teamField.value,
      // norg email ? 
    });
    
    teamField.value = '';
  }
});

