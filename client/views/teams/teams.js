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
  
  'click input#rotaSubmit': function(evt, tmpl) {
    var id                = currentTeam._id + "_" + $('#shiftName').val(), 
        title             = $('#shiftName').val(), 
        length            = $('#shiftLength').val(),
        rotaStartDateTime = new Date(startDatePicker.get() + ' ' + startTimePicker.get()),
        rotaEndDateTime   = new Date(endDatePicker.get() + ' ' + endTimePicker.get()),
        requiresApproval  = !!$('#requiresApprovalYes:checked').length,
        spacesAvailable   = $('#shiftSize').val(),
        getEndDateTime    = function(dtStart, hours) {
          var dtEnd = new Date(dtStart);
          dtEnd.setTime(dtEnd.getTime() + (hours*60*60*1000)); 
          return dtEnd;
        }, 
        dtEnd,
        newEvent;
        
    Rotas.insert({name: title, teamId: currentTeam._id});

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

Template.team.rendered = function(){
  // Since the #confirmationmodal item is not directly in the template, I suppose,
  // we are forced to define our click events here rather than in Template.team.events
  $("#confirmationmodal .positive").click(function() {
    $('.ui.dropdown.user-role-dropdown').each(function() {
      var elem = $(this);
      elem.dropdown("restore defaults");
    });
  });
  
  startDatePicker = $('#shiftFirstStartDate')
                      .pickadate({'today': ''})
                      .pickadate('picker');
  startTimePicker = $('#shiftFirstStartTime')
                      .pickatime()
                      .pickatime('picker');
  endDatePicker   = $('#shiftLastEndDate')
                      .pickadate({'today': ''})
                      .pickadate('picker');
  endTimePicker   = $('#shiftLastEndTime')
                      .pickatime()
                      .pickatime('picker');
  
  datePickerOptions = {
    min: new Date(2015,5,1),
    max: new Date(2015,6,31),
    set: new Date(2015,5,1)
  };
      
  startDatePicker.set(datePickerOptions);
  endDatePicker.set(datePickerOptions);
}
