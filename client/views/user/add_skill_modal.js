Template.addSkillModal.helpers({
  availableSkills: function() {
    var skillsIHave = Meteor.users.findOne(Meteor.userId(),{fields:{"profile.skills":1}})
    // console.log(skillsIHave);
    var skillNames= _.pluck(skillsIHave.profile.skills, 'name');
    //Returns only the skills the user does not already have
    var query = Skills.find({ name: { $nin: skillNames } });
    // console.log("availableSkills: "+query.fetch())
    return query;
  },

});

Template.addSkillModal.rendered = function() { 
  $('#addSkill.modal').modal({
    transition :'vertical flip',
    onHidden :function(){Session.set("checkedList",null);},
    onApprove : function() {
      var checkedSkills = Session.get("checkedList");
      if (!!Session.get("checkedList")){
        // console.log(checkedSkills);
        Meteor.users.update(Meteor.userId(), { $addToSet: { "profile.skills": { $each: checkedSkills } }});
        Session.set("checkedList",null);
      }
    }
  })
};