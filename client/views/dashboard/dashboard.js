Template.dashboard.rendered = function(){
  $('#calendar').fullCalendar({
    events: Events.find().fetch(),
    })
//  .fullCalendar( 'addEventSource', Events.find().fetch())
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