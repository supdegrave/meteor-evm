currentTeam = null;

setSelectedUser = function() {
  $('select.user-role').each(function(idx, elem) {
    var role  = elem.dataset.role,
        $elem = $(elem);

    if (currentTeam && currentTeam[role]) {
      $elem.val(currentTeam[role]);
    }
  });
}


Deps.autorun(function() {
  currentTeam = Session.get('currentTeam');
});

Template.team.helpers({
  getParent: function(parentId) {
    return Teams.findOne({_id: parentId},{name:1});
  },
  roles: function() {
    return TEAM_ROLES;
  }
});

Template.team.events({
  'DOMNodeInserted select': setSelectedUser,
  
  'click button.team-reset': function(evt, tmpl) {
    alert('TODO: add confirmation before reset');
    // reset currentTeam to router-set team data
    currentTeam = this;
    
    // reset select elements
    $('select.user-role').each(function() {
      var elem = $(this);
      elem.val(currentTeam[elem.data('role')]);
    });
  },

  'click button.team-save': function(evt, tmpl) {
    if (canEdit() && !_.isEqual(this, currentTeam)) {
      _.each(TEAM_ROLES, function(role) {
        if (this[role.name] !== currentTeam[role.name]) {
          var teamRole = this.name + " " + role.label;

          // remove current user from role (use `this` object)
          if (this[role.name]) {        
            Roles.removeUsersFromRoles(this[role.name], teamRole);
          }
          
          // assign new user to role (use currentTeam object)
          if (currentTeam[role.name]) {
            Roles.addUsersToRoles(currentTeam[role.name], teamRole);
          }
        }
      }, this);
      
      Meteor.call('teamSave', currentTeam, function(err, res) {
        if (res) {
          console.log('TODO: add verification after save');
        }
        else if (err) {
          alert('TODO: handle failed save')
        }
      });
    }
  },

  'click span.remove-member': function(evt) { 
    if (currentTeam) {
      Teams.update({_id: currentTeam._id}, {$pull: {members: this.toString()}});
    }
  }
});
