UserDataRestrictions.allow({
  update: function(userId, doc, fieldNames, modifier) {
    if (canEdit()) {
      console.log(userId, doc, fieldNames, modifier);
      return true; 
    }
  }
});