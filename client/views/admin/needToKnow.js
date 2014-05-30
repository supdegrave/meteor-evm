var restriction    = null,
    restrictionDep = new Deps.Dependency;

Template.needToKnowModal.restriction = function() {
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
