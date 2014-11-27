Template.org.helpers({
  canAddTeam: function() {
    if (Meteor.user()) {
      return Meteor.userId() === this._id 
              || _.contains(Meteor.user().roles, 'admin');
    }
  },
  initAccordion: function() {
//     console.log(this);//returns organizer object
    var template = Template.instance();
    template.$('.ui.accordion').accordion({exclusive:false});
  },
});

Template.orgTreeItem.helpers({
  teamChildren: function(){
    return Teams.find({parentId: this._id});
  },
  isUser: function(){
    return Meteor.user();
  },
});


// ********************************************* //
// *** addTeam Template events & helpers
// ********************************************* //

Template.addTeam.events({
  // enable 'Add Team' button unless team name already exists 
  'keyup .add-team-input': function(evt, tmpl) {
		var btn  = tmpl.find('.add-team'), 
		    team = evt.target.value.trim();

		if (!team || Teams.find({name: team}).count()) {
			btn.classList.add('disabled');
		} 
		else {
			btn.classList.remove('disabled');
		}

		if (evt.keyCode === 13 && !!team) {
		  btn.click();
		}
  },
  
  // add new team 
  'click .add-team': function(evt, tmpl) {
    var teamField = tmpl.find('.add-team-input');
    
    if (!!teamField.value) {
      Teams.insert(new Team(teamField.value, teamField.dataset.ownerid), function(err, res) {
        if (err && !res) {
          alert('TODO: handle insert error')
        }
      });
    }
    
    teamField.value = '';
    evt.target.classList.add('disabled');
  }
});

// Template.addTeam.teams = function() {
//   return Teams.find();
// }