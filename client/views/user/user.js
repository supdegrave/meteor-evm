 Template.user.helpers({
  myself: function() {
    return this._id === Meteor.userId();
  },
});
