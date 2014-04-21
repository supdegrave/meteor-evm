Meteor.users.allow({
  update: function(userId, doc, fieldNames, modifier) {
    console.log(userId, doc, fieldNames, modifier);
    // TODO: make a real allow rule
    return true; 
  }
});