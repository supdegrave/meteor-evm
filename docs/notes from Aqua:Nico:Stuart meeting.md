## notes from Aqua/Nico/Stuart meeting

### User: 
dietary, medical, emergency contact visibility should all be restricted by roles

- dietary: Werkhaus kitchen leads etc
- medical: malfare leads and shift leads, board members
- emergency contact info: malfare leads and shift leads, board members
- interests: team leads, volunteer leads, ?? 

#### example user document
    {
    	"_id" : "zmRrxzjnrq9RWpDnK",
    	"createdAt" : ISODate("2014-04-07T09:53:27.602Z"),
    	
    	// visible to anyone with user access
    	playaName: "Call Me Pope", // required, Aqua says should be unique (I sort of disagree)
    	
    	"organizer" : true,
    	"profile" : {
    		"name" : "Robert Anton Wilson"
    	},
    	
    	// this needs more thought - should team-level roles be stored as "teamname rolename"? 
    	"roles" : [ "admin", "organizer", "build lead", "signage colead" ],
    	
    	"services" : {
    		"password" : {
    			"srp" : {
    				"identity" : "BGTmbiubpM2nC9E5t",
    				"salt" : "PLMRak2ohTorWFRHe",
    				"verifier" : "7fb6bb1f1c3402453c741d971a11fc7fdaefbc92024cfee1ed0dfe2f75fd7c0046c6faf92ed209dc8fd7bb6d5fe6c5ec757f9fa6a935461f3b85c2444a24996f8330fce4c85089ec7cda359051367f67663aa890fe195eed45eae574e49aab292be2e6af2287f7237df99ba3c46f4989f1d0cc317eb38a9858a76e2aab14f5df"
    			}
    		},
    		"resume" : {
    			"loginTokens" : [ ]
    		}
    	},
      
      // visible to admin, board members, leads of teams where user is a member
      "emails" : [
    		{
    			"address" : "raw@illuminati.org",
    			"verified" : false
    		}
    	],
    	
      // visible to admin, board members, leads of teams where user is a member
    	phones: [
    	  {
          countryCode: xx,
          number: yyyyyyyyyyyy
    	  }, 
    	  ...
    	]
    	
    	// visible to Werkhaus kitchen leads etc
      diet: {
        foodAllergies: ["peanuts", "shellfish", "..."],
        preferences: ["omnivore", "lactose intolerant", "..."]
      },
      
      // visible to malfare leads and shift leads, board members
      "emergencyContact" : {
        name: "",
        email: "",
        phone: {
          countryCode: xx,
          number: yyyyyyyyyyyy      
        },
        relation: "",
        timezone: "UTC+5" // good to have for contact times 
      },
      
      // visible to malfare leads and shift leads, board members
      medical: {
        allergies: ["", ...],
        medications: ["", ...],
        notes: "free text"
      },
      
      // ***** need to figure this out *****
      // visible to team leads, volunteer leads, ?? 
      // interests: 
    }


### Team: 

- block list: array of user ids
- open: bit field, default to false (shifts on open teams can be filled in by anyone not on a block list)
- ?? requestable: bit field, defaults to false
  - this functionality could also potentially go under user interests
- shifts approvable by volunteer lead: bit field, defaults to true 

#### example team document 
    {
    	"_id" : "kAHYNKn8Kg6LvxMeZ",
    	"name" : "Gate",
    	"email" : "gate@goingnowhere.org",
    	
    	"mentor" : "6aq8Y3ZqtnPSTvou3",
    	"lead" : "7FkskikHmQpaiotEp",
    	"colead" : "zmRrxzjnrq9RWpDnK",
    	
    	"members" : [
    		"tTYNZ7Nw24zzwBvzW",
    		"7FkskikHmQpaiotEp",
    		"6aq8Y3ZqtnPSTvou3"
    	],
    	"owner" : "zmRrxzjnrq9RWpDnK",
    	"parentId" : null, 
    
    	// users in this list cannot request shifts for this team
    	blockList: [
    	  "array of", 
    	  "user ids"
    	],
    	
    	// open: shifts on open teams can be requested by anyone not on a block list
    	// bit field, default to false 
    	open: false, 
    }
    
    // if we move to admin-controlled team roles, maybe this instead
    
    {
    	"_id" : "kAHYNKn8Kg6LvxMeZ",
    	"name" : "Gate",
    	"email" : "gate@goingnowhere.org",
    	
    	roles: [
      	"mentor" : "6aq8Y3ZqtnPSTvou3",
      	"lead" : "7FkskikHmQpaiotEp",
      	"colead" : "zmRrxzjnrq9RWpDnK",
    	]
    	
    	// remaining fields elided
    }


### Shifts: 

- users can request specific shifts
  - shifts require approval 
    - some teams can have shifts approved only by team lead, others by volunteer lead as well
  - approval: 
    - have 'approve all' button / option to use after rejecting any requests 

### Roles

- options for limiting visibility
  1 use actual roles
  2 programmatic determination 
- roles is more work for admin types
- programmatic determination is more brittle and bug-prone 

