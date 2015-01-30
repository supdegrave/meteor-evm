Template.calendarEvent.events({
  'click #spaces': function(evt, tmpl) {
    console.log(evt, tmpl.data);
  }
});

Template.calendarEvent.helpers({
  spacesTaken: function() {
    return this.spacesAvailable - this.requests.length;
  }
});