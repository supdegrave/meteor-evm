Meteor.users.allow({
  update: function(userId, doc, fieldNames, modifier) {
    // TODO: make a real allow rule
    console.log(userId, doc, fieldNames, modifier);
   if(canEdit()) 
     return true; 
  },
  insert: function(userId, doc) {
   if(canEdit()) 
     return true; 
  },
});
Meteor.methods({
  usersUpsert: function( id, doc , fieldNames, modifier){
    console.log(id);
    console.log(JSON.stringify(doc));
     Meteor.users.upsert( id, doc, fieldNames, modifier );
  }
});