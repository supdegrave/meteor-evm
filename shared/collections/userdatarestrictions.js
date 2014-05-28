UserDataRestrictions = new Meteor.Collection('userdatarestrictions');

Restriction = function(property, description, visibleTo) {
  this.property  = property.trim();
  this.label     = description;
  this.visibleTo = visibleTo;
}

Restriction.prototype = {
  property: null,
  label: null,
  visibleTo: []
}
