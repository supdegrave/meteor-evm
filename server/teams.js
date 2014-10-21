Meteor.methods({
  teamSave: function(doc) {
    if (canEdit()) {
      return Teams.update({_id: doc._id}, doc);
    }
  }
});