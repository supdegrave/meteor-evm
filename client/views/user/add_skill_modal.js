
Template.addSkillModal.helpers({
  availableSkills: function() {
    //Returns only the teams the user is not already a member of
    var skillsIHave = Users.findOne(Meteor.userId(),{skills:1,_id:0 })
    var query = Skills.find({ name: { $nin: [skillsIHave.name] } });
    console.log("availableSkills: "+query.fetch())
    return query;
  },

});

Template.addSkillModal.rendered = function() { 
  $('#addSkill.modal').modal({
    transition :'vertical flip',
    onHidden :function(){Session.set("checkedList",null);},
    onApprove : function() {
      var checkedSkills = Session.get("checkedList");
      if (!!checkedSkills){
        // Simplified update call to chack if it is working. Currently, nope.
        // It doesn't event trigger the console log on the Meteor.users.allow -> update (server/users.js)
        Meteor.users.update(Meteor.userId(), { $addToSet: { "profile.skills": checkedSkills[0] }});
//         Meteor.call('usersUpsert',Session.get('userInScope')._id,{$push: {"profile.skills":{ $each: checkedSkills}}}, function(err, res) {
//           if (res) {
//             console.log('add_skill_modal.js // TODO: add verification after save');
//           }
//           else if (err) {
//             console.log(err);
//           }
//         });
        Session.set("checkedList",null);
      }
    }
  })
};