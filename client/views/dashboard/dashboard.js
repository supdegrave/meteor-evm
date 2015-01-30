var logged = false;

Template.dashboard.rendered = function(){
  $('#calendar').fullCalendar({
    events: function(start, end, timezone, callback) {
      callback(Events.find().fetch()); 
    },
    
    eventRender: function(event, element) {
      if (!logged) {
        // console.log(event);
        console.log(element.context);
        // console.log(element.parent());
        logged = true;
      }
      
      // element.context appends to the parent td element
      // Blaze.renderWithData(Template.calendarEvent, event, element.context);
      // element.parent().context replaces the parent td element
      Blaze.renderWithData(Template.calendarEvent, event, element.parent().context);
    },
    
    eventClick: function(calEvent, jsEvent, view) {
      console.log(calEvent, jsEvent, view);
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