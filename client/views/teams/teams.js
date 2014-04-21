currentTeam = null;

Deps.autorun(function() {
  currentTeam = Session.get('currentTeam');
});

Template.team.helpers({
  getParent: function(parentId) {
    return Teams.findOne({_id: parentId});
  },
});

Template.userRole.helpers({
  users: function() {
    var users = Meteor.users.find().fetch();
    return ("owner" === this.role) 
      ? _.where(users, {organizer: true})
        : users;
  },
  
  selectedUserName: function(user) {
    if (currentTeam) {      
      var user = Meteor.users.findOne({_id: currentTeam[this.role]});
      return (!!user) ? displayName(user) : "none";
    }
  }
});

Template.userRole.events({
  'DOMNodeInserted select': function(evt, tmpl) {
    if (currentTeam && currentTeam[this.role]) {
      $(evt.target).val(currentTeam[this.role]);
    }
  }, 
  
  'change select.user-role': function(evt, tmpl) {
    var target = evt.target, 
        role   = $(target).data('role');
        
    if (currentTeam) {
      currentTeam[role] = target.value;
    }
  }
});

Template.team.events({
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
    if (canEdit()) {
      Meteor.call('teamSave', currentTeam, function(err, res) {
        if (res) {
          alert('TODO: add verification after save');
        }
        else {
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
