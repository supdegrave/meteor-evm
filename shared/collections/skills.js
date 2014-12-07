Skills = new Meteor.Collection('skills');
Skills.allow({
  insert: function(userId, doc) {
    if (canEdit())
      return doc;
  },
  remove: function(userId, doc) {
    if(canEdit())
      return doc;
  },
  update: function(userId, doc) {
    if(canEdit())
      return doc;
  },
});

Skill = function(name, description) {
  this.name  = name.trim();
  this.description = description;
}

Skill.prototype = {
  name: null,
  description: null
}


