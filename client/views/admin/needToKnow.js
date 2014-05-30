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

Template.needToKnow.events({
  'mouseenter, click .clickable': function(evt, tmpl) {
    var value  = evt.target.dataset.property, 
        filter = !!value ? {property: value} : {};
        
    restriction = UserDataRestrictions.findOne(filter);
    restrictionDep.changed();
  },
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