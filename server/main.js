// main server-side code file 

if (Meteor.isServer) {
  // Workshops.allow({
  //   insert: function(userId, doc) {
  //     return true;
  //   }
  // });
  // 
  // Meteor.publish("workshops", function(){
  //   return Workshops.find();
  // });
  
  Meteor.publish("userData", function () {
    return Meteor.users.find(
      {_id: this.userId},
      {fields: {'other': 1, 'things': 1}}
    );
  });
  
  Meteor.publish("allUserData", function () {
    return Meteor.users.find(
      {}, 
      {fields: {"emails": 1, "profile": 1}}
    );
  });
  
  Meteor.startup(function() {
    var email = "stuart@updegrave.com",
        user  = Meteor.users.findOne({emails: {$elemMatch: {address: email}}});
    
    if (!user) {
      Accounts.createUser({
        username: "supdegrave",
        email: email,
        password: "changeme"
      });
      
      user = Meteor.users.findOne({emails: {$elemMatch: {address: email}}});
    }
    
    Roles.addUsersToRoles(user._id, ['admin']);
  });
}