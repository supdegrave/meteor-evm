// main client-side code file 

if (Meteor.isClient) {
  Deps.autorun(function(){
    Meteor.subscribe("functions");
    Meteor.subscribe("userData");
    Meteor.subscribe("allUserData");
  })
  
  // Template-specific methods
  // Template.<template-name>.<method-name> = function(args?) {
  //   // do something 
  //   return someValue;
  // }

  // Template-specific events
  // Template.<template-name>.events({
  //   '<event-name> <selector>': function(evt, tmpl) {
  //     // event handling code
  //   }
  // });
}