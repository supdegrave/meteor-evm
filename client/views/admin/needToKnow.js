var restriction, restrictionDep, getRestriction, setRestriction;

restriction    = null;
restrictionDep = new Deps.Dependency;

getRestriction = function() {
  restrictionDep.depend();
  return restriction;
};

setRestriction = function (evt, tmpl) {
  var prop = (this === window) ? {} : {property: this.property};
  restriction = UserDataRestrictions.findOne(prop);
  restrictionDep.changed();
};

Template.needToKnow.rendered = function() {
  // set initial restriction value when page renders
  // modal edit dialog won't initialize without this data
  UserDataRestrictions.find().observe({
    added: function(doc) {
      setRestriction();
    }
  });
};

Template.needToKnow.helpers({
  restrictedFields: function() {
    return UserDataRestrictions.find();
  },
});

Template.needToKnow.events({
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