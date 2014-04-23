Template.org.helpers({
  canAddTeam: function() {
    return Meteor.userId() === this._id 
            || _.contains(Meteor.user().roles, 'admin');
  }
})