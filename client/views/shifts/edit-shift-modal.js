Template.editShiftModalContent.events({
  'click .button.join' : function() {
    Session.set('requesterId', Meteor.userId());
  },
  'click .button.request' : function() {
    Session.set('requesterId', Meteor.userId());
  }
});

Template.editShiftModalContent.helpers({
  sameDate: function(start, end) {
    return start.date() === end.date();
  },
  hasSpaces: function() {
    return this.spacesAvailable - this.volunteers.length;
  }
});

// Template.editShiftModalContent.rendered = function() {
// };

// Template.editShiftModal.rendered = function() {
// };

/*
{
  "_id": "2LRqMMkJzkC8jkMZj",
  "title": "Limited Rota Test",
  "teamId": "aj2apwTQN3A5dRr49",
  "id": "aj2apwTQN3A5dRr49_Limited_Rota Test",
  "start": "2015-01-13T07:00:00.000Z",
  "end": "2015-01-13T11:00:00.000Z",
  "requiresApproval": false,
  "spacesAvailable": "8",
  "volunteers": [],
  "requests": [],
  "source": {
    "className": []
  },
  "className": [],
  "allDay": false,
  "_allDay": false,
  "_start": "2015-01-13T07:00:00.000Z",
  "_end": "2015-01-13T11:00:00.000Z"
}
*/