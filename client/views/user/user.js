Template.user.helpers({
  editMode: function() {
    return Session.get('edit_profile');
  }
});

Template.user.events({
});

Template.user.rendered = function() {
};