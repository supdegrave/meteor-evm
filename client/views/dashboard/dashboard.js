Template.dashboard.rendered = function(){
  $('#calendar').fullCalendar({
    events: function(start, end, timezone, callback) {
      callback(Events.find().fetch()); 
    },
    
    eventRender: function(event, element) {
      var node = element.context;
      node.removeChild(node.childNodes[0]);
      
      Blaze.renderWithData(Template.calendarEvent, event, node);
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