Template.calendarEvent.events({
  'click #spaces': function(evt, tmpl) {
    console.log(evt, tmpl.data);
  }
});

Template.calendarEvent.helpers({
  spacesTaken: function() {
    return this.spacesAvailable - this.requests.length;
  },
  
  formatTime: function(moment) {
    return moment.format('HH');
  }
});

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