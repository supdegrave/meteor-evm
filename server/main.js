// main server-side code file 

// *** allow / deny rules *** 
// <CollectionName>.(allow|deny)({
//   (insert|update|remove): function(userId, doc) {
//     return someCalculatedBooleanValue
//   },
//   fetch: ['array of fieldnames', 'to be returned']
// });

// *** publishing collection data *** 
// Meteor.publish("collection_name", function(){
//   return CollectionName.find();
//   // or 
//   return CollectionName.find(
//     {fieldName: value}, // filter collection
//     {fields: {fieldName: 1, [...] }} // control fields to sync to client
//   );
// });

Meteor.publish("allUserData", function () {
  var fieldsFilter = {}, 
      currentUser  = Meteor.users.findOne(this.userId);
      
  UserDataRestrictions.find().forEach(function(restriction) {
    if (currentUser 
        && currentUser.roles 
        && !_.intersection(currentUser.roles, restriction.visibleTo).length) {
          fieldsFilter[restriction.property] = 0;
        }
  });
  
  return Meteor.users.find({}, {fields: fieldsFilter});
});

Meteor.publish('teams', function() {
  return Teams.find();
});

Meteor.publish('userdatarestrictions', function() {
  return UserDataRestrictions.find({}, {sort: {label: 1}});
})
Meteor.publish('events', function() {
  return Events.find();
});
Meteor.publish('rotas', function() {
  return Rotas.find();
});
Meteor.publish('skills', function() {
  return Skills.find({}, {sort: {name: 1}});
});

Meteor.startup(function() {
  initializeUsers();
  initializeUserDataRestrictions();
});

Meteor.methods({
  adminAddUser: function(email) {
    if (email.match(EMAIL_REGEXP)) {
      var userId = Accounts.createUser( {email: email} );
      if (userId) {
        Accounts.sendEnrollmentEmail(userId, email);
      }
    }
    else {
      throw new Meteor.Error(500, 'Unable to create user.', 'The email address appears to be invalid.');
    }
  }
});


// ****************************************************** //
// function: initializeUsers
// ****************************************************** //
// on app startup, checks if any users exist
// if not, adds admin user
// and if in dev environment, adds 
// * test team
// * test users for various roles (organizer, team lead)
// * test user with all profile values 
//   - (for testing UserDataRestrictions)
// 
// return: none
// ****************************************************** //
function initializeUsers() {
  if (!Meteor.users.find().count()) {
    // create admin user
    addUserToRole("stuart@updegrave.com", "admin");
    
    // running in local environment - spin up test data
    if (-1 != Meteor.absoluteUrl().indexOf('localhost')) {
      var orgId    = addUserToRole('organizer@example.com', 'organizer'), 
          leadId   = addUserToRole('lead@example.com', 'Test Team Lead'),
          testUser = Accounts.createUser({
            username: 'TestUser',
            email: 'test_user@example.com',
            password: 'changeme',
            profile: {
              playaName: "Testy",
              skype: "testtest123",
              firstName: "Test",
              lastName: "User",
              gender: "Other",
              phones: [ {countryCode: 34, number: 601234567} ],

              diet: {
                allergies: ["peanuts"],
                preferences: ["food"]
              },

              emergencyContact: {
                name: "Papa Testuser",
                email: "papa_testuser@example.com",
                phone: {countryCode: 1, number: 2345678901},
                relation: "Papa",
                timezone: "UTC-5"
              },

              medical: {
                allergies: ["Penicillin"],
                medications: ["Viagra"],
                notes: "Doesn't like the sight of blood."
              }
            }
          }),
           
          testTeam = Teams.insert({ 
            name: "Test Team", 
            owner: orgId,
            lead: leadId,
            email: 'test_team@goingnowhere.org',
            members: [testUser] 
          }),
          
          testEvent = Events.insert({ 
            id: testTeam._id + '_Test_Events_shift',
            title: "Test Events shift", 
            start: "2014-10-31", 
            end: "2014-12-31", 
            users: [testUser],
            teamId: testTeam._id,
            requiresApproval: false,
            requests: null,
            spacesAvailable: 10,
          }),
          
          testRota = Rotas.insert({
            name: testEvent.id,
            teamId: testTeam._id
          });
    }
  }
}


// ****************************************************** //
// function: addUserToRole
// ****************************************************** //
// email: a single email address
// - a new account will be created if it doesn't exist
// role: a single role name
// - each email address will be added to the listed role 
// - role will be created if it doesn't exist
// 
// return: userId of user (existing or new)
// ****************************************************** //
function addUserToRole(email, role) {
  var user   = Meteor.users.findOne({'emails.0.address': email}), 
      userId = !!user && user._id;

  if (!userId) {
    userId = Accounts.createUser( {email: email, password: 'changeme'} );
    Accounts.sendEnrollmentEmail(userId);
  }

  if (!Roles.userIsInRole(userId, role)){
    Roles.addUsersToRoles(userId, role);
  }
  
  console.log(userId + ': added user [' + email + '] to role [' + role + ']')
  return userId;
}


// ****************************************************** //
// function: initializeUserDataRestrictions
// ****************************************************** //
// on startup, populates UserDataRestrictions collection
// based on elements with restricted: true in 
// Meteor.users.simpleSchema().schema()
// 
// return: none
// ****************************************************** //
function initializeUserDataRestrictions() {
  console.log('populating UserDataRestrictions');
  var schema = Meteor.users.simpleSchema().schema();
  
  for (prop in schema) { 
    // if schema item has 'restricted' property
    // insert a restriction if there isn't already one
    if (schema[prop]['restricted']) { 
      if (!UserDataRestrictions.findOne({property: prop})) {
        console.log("adding UserDataRestriction:", prop);        
        UserDataRestrictions.insert(new Restriction(prop, schema[prop].label), function(err, res) {
          if (err && !res) {
            console.log('TODO: handle UserDataRestrictions insert error');
          }
        });
      }
    }
    // otherwise remove restriction if one exists
    else {
      if (UserDataRestrictions.findOne({property: prop})) {
        console.log("removing UserDataRestriction:", prop);
        UserDataRestrictions.remove({property: prop});
      }
    }
  }
}

// ****************************************************** //
// object: testUser
// ****************************************************** //
// sample user object containing minimal data for all
// required and optional user fields
// 
// used to verify UserDataRestrictions functionality
// ****************************************************** //

var testUser = {
  username: 'Test User',
  email: 'test_user@example.com',
  password: 'changeme',
  profile: {
    playaName: "Testy",
    skype: "testtest123",
    firstName: "Test",
    lastName: "User",
    gender: "Other",
    phones: [ {countryCode: 34, number: 601234567} ],

    diet: {
      allergies: "peanuts",
      preferences: "food"
    },

    emergencyContact: {
      name: "Papa Testuser",
      email: "papa_testuser@example.com",
      phone: {countryCode: 1, number: 2345678901},
      relation: "Papa",
      timezone: "UTC-5"
    },

    medical: {
      allergies: ["Penicillin"],
      medications: ["Viagra"],
      notes: "Doesn't like the sight of bloo"
    }
  }
};
