currentTeam = null;

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
});

Template.recursiveParentBreadcrumb.helpers({
  getParent: function(parentId) {
    return Teams.findOne({_id: parentId},{name:1});
  }
});


Template.team.events({
  'DOMNodeInserted select': setSelectedUser,
  
  'click #team-reset': function(evt, tmpl) {
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

  'click span.remove-member': function(evt) { 
    if (currentTeam) {
      Teams.update({_id: currentTeam._id}, {$pull: {members: this.toString()}});
    }
  },
  
  'click input#rotaSubmit': function(evt, tmpl) {
    var id                = currentTeam._id + "_" + $('#shiftName').val(), 
        title             = $('#shiftName').val(), 
        length            = $('#shiftLength').val(),
        rotaStartDateTime = new Date($('#shiftFirstStart').val()),
        rotaEndDateTime   = new Date($('#shiftLastEnd').val()),
        requiresApproval  = !!$('#requiresApprovalYes:checked'),
        spacesAvailable   = $('#shiftSize').val(),
        getEndDateTime    = function(dtStart, hours) {
          var dtEnd = new Date(dtStart);
          dtEnd.setTime(dtEnd.getTime() + (hours*60*60*1000)); 
          return dtEnd;
        }, 
        dtEnd,
        newEvent;

    for (dtStart = rotaStartDateTime; dtStart < rotaEndDateTime;) {
      dtEnd = getEndDateTime(dtStart, length);

      newEvent = new Event(title, id, dtStart, dtEnd);
      
      // custom properties for Nowhere EVM
      newEvent.teamId = currentTeam._id, // allows searching for team-specific rotas
      newEvent.requiresApproval = requiresApproval,
      newEvent.spacesAvailable = spacesAvailable,
      newEvent.volunteers = [], // array of simple user objects, to simplify display = {_id = int, name = string }
      newEvent.requests = [], // array of userId integers
    
      Events.insert(newEvent);

      // increment loop position
      dtStart = dtEnd;
    }
  }

});

Template.team.rendered=function(){
  // Since the #confirmationmodal item is not directly in the template, I suppose,
  // we are forced to define our click events here rather than in Template.team.events
  $("#confirmationmodal .positive").click(function(){
    $('.ui.dropdown.user-role-dropdown').each(function() {
      var elem = $(this);
      elem.dropdown("restore defaults");
    });
  })
}
