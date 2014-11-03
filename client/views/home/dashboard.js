Template.dashboard.rendered = function(){
  $('#calendar').fullCalendar({
        // put your options and callbacks here
    events: Events.findOne(),
    color: 'yellow',   // an option!

    })
};
Template.dashboard.helpers({
  firstlogin: function(){
    var user = Meteor.users.findOne({_id: Meteor.userId()});
    return user
      && user.services 
      && user.services.resume 
      && user.services.resume.loginTokens 
      && user.services.resume.loginTokens.length<1;
  }
})