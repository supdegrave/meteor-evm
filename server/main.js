// main server-side code file 

// *** allow / deny rules *** 
// <CollectionName>.(allow|deny)({
//   (insert|update|remove): function(userId, doc) {
//     return someCalculatedBooleanValue
//   },
//   fetch: ['array of fieldnames', 'to be returned']
// });

// *** publishing collection data *** 
// Meteor.publish("collection_name", function(){
//   return CollectionName.find();
//   // or 
//   return CollectionName.find(
//     {fieldName: value}, // filter collection
//     {fields: {fieldName: 1, [...] }} // control fields to sync to client
//   );
// });

Meteor.publish("allUserData", function () {
  return Meteor.users.find(
    {}, 
    {fields: {"emails": 1, "profile": 1}}
  );
});

Meteor.startup(function() {
  addUsersToRoles("stuart@updegrave.com", "admin");
});


// ****************************************************** //
// function: addUsersToRoles
// ****************************************************** //
// emails: array of email addresses
// - new accounts will be created if they don't exist
// roles: array of role names
// - each email address will be added to the listed roles 
// - roles will be created if they don't already exist
// 
// return: none
// ****************************************************** //
function addUsersToRoles(emails, roles) {
  if ("string" === typeof emails) { emails = [emails] };
  if ("string" === typeof roles) { roles = [roles] };
  
  emails.forEach(function(email) {
    var user = Meteor.users.findOne({emails: {$elemMatch: {address: email}}}), 
        userId = !!user && user._id;
        
    if (!userId) {
      userId = Accounts.createUser( { email: email });
      Accounts.sendEnrollmentEmail(userId);
    }

    if (!Roles.userIsInRole(userId, roles)){
      Roles.addUsersToRoles([userId], roles);
    }
  }); 
}