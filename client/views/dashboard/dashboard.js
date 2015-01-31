Template.dashboard.rendered = function() {
  // initialize calendar view
  $('#calendar').fullCalendar({
    // populate events 
    events: function(start, end, timezone, callback) {
      callback(Events.find().fetch()); 
    },
    // when event is rendered, rewrite its default contents
    eventRender: function(event, element) {
      var node = element.context;
      node.removeChild(node.childNodes[0]);
      Blaze.renderWithData(Template.calendarEvent, event, node);
    },
    // when event is clicked, show edit modal 
    eventClick: function(calEvent, jsEvent, calView) {
      var editShiftModal = $('#editShiftModal');
      editShiftModal.modal('show');
      Blaze.renderWithData(Template.editShiftModalContent, calEvent, editShiftModal[0]);
    }
  });


  // initialize modal dialog
  $('#editShiftModal')
    .modal('setting', 'transition', 'vertical flip')
    .modal({
      // initialization on display of modal 
      onShow: function() {
        // clear HTML content before resetting in calendar.eventClick() 
        this.innerHTML = '';
      },
      // cancel button functionality
      onDeny: function() {
        console.log('onDeny');
      },
      // create button functionality 
      onApprove: function() {
        console.log('onApprove');
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