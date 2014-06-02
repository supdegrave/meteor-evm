SimpleSchema.extendOptions({
  restricted: Match.Optional(Boolean)
});

phoneSchema = new SimpleSchema({
  countryCode: {
    type: Number,
    regEx: /[0-9]{1,3}/
  },
  number: {
    type: Number,
    regEx: /[0-9]{5,14}/
  }
});

userProfileSchema = new SimpleSchema({
  playaName: {
    type: String,
    regEx: /^[a-zA-Z- ]{2,40}$/,
    label: "Playa Name"
    // custom: function() {/* verify uniqueness */}
  },
  skype: {
    type: String,
    regEx: /^[a-z][a-z0-9\.,\-_]{5,31}$/i,
    label: "Skype Username",
    optional: true, 
    restricted: true
  },
  firstName: {
    type: String,
    regEx: /^[a-zA-Z-]{2,25}$/,
    optional: true
  },
  lastName: {
    type: String,
    regEx: /^[a-zA-Z]{2,25}$/,
    optional: true
  },
  gender: {
    type: String,
    allowedValues: ['Male', 'Female', 'None', 'Other'],
    restricted: true,
    label: "Gender"
  },
  roles: {
    type: [String],
  },

  phones: {
    type: [phoneSchema],
    restricted: true,
    label: "Phone Numbers"
  },

  diet: {
    type: Object,
    restricted: true,
    label: "Dietary Information (preferences, allergies)"
  }  ,
  "diet.allergies": {
    type: [String]
  }  ,
  "diet.preferences": {
    type: [String]
  },

  emergencyContact: {
    type: Object,
    restricted: true,
    label: "Emergency Contact"
  },
  "emergencyContact.name": {
    type: String
  },
  "emergencyContact.email": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emergencyContact.phone": {
    type: phoneSchema
  },
  "emergencyContact.relation": {
    type: String
  },
  "emergencyContact.timezone": {
    type: String
  },

  medical: {
    type: Object,
    restricted: true,
    label: "Medical Information"
  },
  "medical.allergies": {
    type: [String]
  },
  "medical.medications": {
    type: [String]
  },
  "medical.notes": {
    type: String
  },
});

userSchema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/,
    // restricted: true
  },
  emails: {
    type: [Object],
    restricted: true,
    label: "Email Addresses"
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: userProfileSchema,
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

Meteor.users.attachSchema(userSchema);