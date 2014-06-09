Template.org.helpers({
  canAddTeam: function() {
    return Meteor.userId() === this._id 
            || _.contains(Meteor.user().roles, 'admin');
  }
});

Template.orgTreeItem.helpers({
  teamChildren: function(){
    return Teams.find({parentId: this._id});
  }
});
Template.orgTreeItem.rendered = function(){
  $('.ui.accordion').accordion("exclusive",false);
};
