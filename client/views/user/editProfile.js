var user, 
    userSchema; 

Template.editProfile.rendered = function() { 
  user = this.data;
  userSchema = Meteor.users.simpleSchema().schema()
  
  // set selected timezone for emergency contact; default to GMT 
  var timezone = user
                 && user.profile
                 && user.profile.emergencyContact
                 && user.profile.emergencyContact.timezone
                 || 'UTC±0';

  $('#timezone option[value=' + timezone + ']').attr('selected', 'selected');
};

Template.editProfile.helpers({
  user: function() { 
    return this; 
  },
  
  userSchema: function() {
    return userSchema;
  },
  
  genders: function() {
    return userSchema['profile.gender'].allowedValues;
  }
});

Template.editProfile.events({
});