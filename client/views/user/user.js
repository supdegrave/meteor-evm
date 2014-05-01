 Template.user.helpers({
  myself: function(IDToCheck) {
    return IDToCheck === Meteor.userId();
  },
});
