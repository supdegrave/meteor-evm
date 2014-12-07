Template.teamsDashboard.helpers({
  leadRoleInTeams: function() {
    var myQuery = Teams.find({$or: [
        {lead: this._id},
        {colead: this._id},
        {mentor: this._id},
        {owner: this._id}
        ]},
      {name:1});
    if (myQuery.fetch().length) return myQuery;
  },
  teamMembersCount: function() {
    return this.members.length;
  },
  fetchLeadName:function(leadId){
    return Meteor.users.findOne( { _id: leadId},{name:1});
  },
  leadIsFilled :function(){
    return !!this.lead;
  },
  coleadIsFilled :function(){
    return !!this.colead;
  },
  mentorIsFilled :function(){
    return !!this.mentor;
  },
  log : function(toLog){
    console.log("Log called from template // "+ toLog);
  },
});