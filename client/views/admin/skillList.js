Template.skillListRow.created = function(){
  var editOnCreated = this.data.editOnAdd ? true : false;
  this.editing = new ReactiveVar(editOnCreated);
}
Template.skillListRow.helpers({
  editSwitch:function(){
    return Template.instance().editing.get();
  }
})
Template.skillListRow.events({
  'click .editSkill': function(event, template) {
     template.editing.set(true);
  },
  'click .validateSkillEdit': function(event, template) {
     template.editing.set(false);
    var skillName = template.$('input[name=name]').val();
    var skillDesc = template.$('input[name=description]').val();
    var modifiers={};
    if(skillName){
      modifiers.name = template.$('input[name=name]').val();
    }
    if(skillDesc){
      modifiers.description = template.$('input[name=description]').val();
    } 
    Skills.update(template.data._id,{$set: modifiers}, function(error,modifiedDocCount){
      if (error) {
        console.log(error);
        return;
      }
      console.log("Updated "+modifiedDocCount+" skill(s)");
    });   
  },
  'click .cancelSkillEdit': function(event, template) {
    template.editing.set(false);
  },
});


Template.addSkill.created = function(){
  this.adding = new ReactiveVar(false);
}
Template.addSkill.helpers({
  newSkillSwitch:function(){
    return Template.instance().adding.get();
  }
})
Template.addSkill.events({
  'click .validateSkillEdit': function(event, template) {
    template.adding.set(false);
    var skillName = template.$('input[name=name]').val();
    var skillDesc = template.$('input[name=description]').val();
      if(skillName && skillDesc){
        template.$('input[name=description]').parent().removeClass("error");
        template.$('input[name=description]').parent().removeClass("error");
        Skills.insert(new Skill(skillName, skillDesc), function(error,modifiedDocCount){
          if (error) {
            console.log(error);
            return;
          }
          console.log("Updated "+modifiedDocCount+" skill(s)");
        });
      }else if(!!skillName){
        template.$('input[name=name]').parent().addClass("error");
      }else if(!!skillDesc){
        template.$('input[name=description]').parent().addClass("error");
      }
  },
  'click .cancelSkillEdit': function(event, template) {
    template.adding.set(false);
  },
  'click #addASkill': function(event, template) {
     template.adding.set(true);
  },
});