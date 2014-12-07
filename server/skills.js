Meteor.methods({
  insertSkill: function(skillName, skillDescription) {
    //Let's check if arguments passes are indeed String objects
    check(skillName, String);
    check(skillDescription, String);

    // handle user already in team
    if (Skills.find({name: skillName}).fetch().length>0)
      throw new Meteor.Error(422, "Skill '" + skillName+ "' already exists");
    
      return Skills.insert(new Skill(skillName, skillDescription));
  },
});