var restriction    = null,
    restrictionDep = new Deps.Dependency, 
    getRestriction = function() {
      restrictionDep.depend();
      return restriction;
    };

Template.needToKnow.helpers({
  restrictedFields: function() {
    return UserDataRestrictions.find();
  },
});

function setRestriction(evt, tmpl) {
  console.log(this);
  restriction = UserDataRestrictions.findOne({property: this.property});
  restrictionDep.changed();
}

Template.needToKnow.events({
  // duplicate for mouseenter & click due to apparent Meteor bug
  'mouseenter span.clickable': setRestriction,
  'click span.clickable': setRestriction
});

Template.needToKnowModal.restriction = getRestriction;

Template.needToKnowModal.helpers({  
  visibleToRoles: function() {
    var roles = Roles.getAllRoles().map(function(role) {
      if (_.contains(getRestriction().visibleTo, role.name)) {
        role.checked = true;
      };
      return role;
    });

    return roles; 
  }
});

Template.needToKnowModal.events({
  'click button.btn-primary': function(evt, tmpl) {
    var restriction = getRestriction(),
        roles       = [];

    $('div.modal-body>div>input:checked').each(function(idx, elem) {
      roles.push(elem.value);      
    });
    
    UserDataRestrictions.update({_id: restriction._id}, {$set: {visibleTo: roles}});
    $('#needtoknow').modal('hide');
  },
});