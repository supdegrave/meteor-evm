currentTeam = null;

var startDatePicker, 
    startTimePicker,
    endDatePicker, 
    endTimePicker;

setSelectedUser = function() {
  $('input.user-role-input').each(function(idx, elem) {
    var role  = elem.dataset.role,
        $elem = $(elem);

    if (currentTeam && currentTeam[role]) {
      $elem.val(currentTeam[role]);
    }
  });
}


Tracker.autorun(function() {
  currentTeam = Session.get('currentTeam');
});

Template.team.helpers({
  roles: function() {
    return TEAM_ROLES;
  },
  rotas: function() {
    if (currentTeam) {
      return Rotas.find({teamId: currentTeam._id});
    }
  },
  userInScope: function() {
    return Session.get('userInScope');
  },
});

Template.recursiveParentBreadcrumb.helpers({
  getParent: function(parentId) {
    return Teams.findOne({_id: parentId},{name:1});
  }
});


Template.team.events({
  'DOMNodeInserted select': setSelectedUser,
  
  'click #team-reset': function(evt, tmpl) {
    $("#confirmationmodal .content .right").html("<p>Are you sure you want to reset this team?</p>");
    $("#confirmationmodal").modal("show");
  },

  'click #team-save': function(evt, tmpl) {
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

  'click .remove-member': function(evt, tmpl) { 
    console.log("this: "+this.toString());
    var targetMember = this.toString();
    // console.log("this.toString(): "+this.toString());
    $("#confirmationmodal .content .right").html("<p>Are you sure you want to remove user {{displayName this}} from this team?</p>");
    $("#confirmationmodal").modal({
      onApprove : function() {
        if (currentTeam) {
        Meteor.call('removeUserFromTeam', targetMember, currentTeam._id, function(err, res) {
          if (res) {
            console.log('add_to_team_modal.js // TODO: add verification after save');
          }
          else if (err) {
            console.log(err);
          }
          });
        }
      }
    })
    .modal("show");
  },
  
  'click button.add-shift-rota': function(evt, tmpl) {
    // show new shift / rota wizard modal 
    $('#addShiftRotaModal').modal('show');
  }
});
