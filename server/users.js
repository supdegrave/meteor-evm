Meteor.users.allow({
  update: function(userId, doc, fieldNames, modifier) {
    console.log(userId, doc, fieldNames, modifier);
    return true; 
  }
});