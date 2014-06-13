var restriction    = null, 
    restrictionDep = new Deps.Dependency, 
    
    getRestriction = function() {
      restrictionDep.depend();
      return restriction;
    },
    
    setRestriction = function(doc) {
      restriction = doc || UserDataRestrictions.findOne({});
      restrictionDep.changed();
    };

Template.needToKnow.rendered = function() {
  // set initial restriction value when page renders
  // modal edit dialog won't initialize without this data
  UserDataRestrictions.find().observe({
    added: setRestriction
  });

  $('.ui.checkbox').checkbox();
};

Template.needToKnow.helpers({
  restrictedFields: function() {
    return UserDataRestrictions.find();
  },
});

Template.needToKnow.events({
  'click .modalCallButton': function(event, template) {
    setRestriction(this);
    
    $($(event.currentTarget).data("target"))
      .modal('setting', {
        transition: 'vertical flip',
        onApprove : function() {
          var roles = [];
          
          $('div#needtoknow div.ui.checkbox > input:checked').each(function(idx, elem) {
            roles.push(elem.value);      
          });
          
          UserDataRestrictions.update({_id: getRestriction()._id}, {$set: {visibleTo: roles}});        
        }
      })
      .modal('show');
  },
});

Template.needToKnowModal.restriction = getRestriction;

Template.needToKnowModal.helpers({  
  visibleToRoles: function() {
    return Roles.getAllRoles().map(function(role) {
      if (_.contains(getRestriction().visibleTo, role.name)) {
        role.checked = true;
      };
      return role;
    });
  }
});