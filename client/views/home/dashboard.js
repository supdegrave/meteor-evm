Template.dashboard.rendered = function(){
  $('#calendar').fullCalendar({
    events: function(start, end, timezone, callback) {
      callback(Events.find().fetch()); 
    },
    
    eventRender: function(event, element) {
      // return Template.calendarEvent.renderFunction(event);
    }
  });
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