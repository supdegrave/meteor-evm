var EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

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
    label: "Playa name",
    optional: true
    // custom: function() {/* verify uniqueness */}
  },
  skype: {
    type: String,
    regEx: /^[a-z][a-z0-9\.,\-_]{5,31}$/i,
    label: "Skype username",
    optional: true, 
    restricted: true
  },
  firstName: {
    type: String,
    regEx: /^[a-zA-Z-]{2,25}$/
  },
  lastName: {
    type: String,
    regEx: /^[a-zA-Z]{2,25}$/
  },
  gender: {
    type: String,
    allowedValues: ['Male', 'Female', 'None', 'Other'],
    restricted: true,
    label: "Gender"
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
    type: [String], 
    optional: true
  }  ,
  "diet.preferences": {
    type: [String], 
    optional: true
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
    regEx: EMAIL_REGEXP
  },
  "emergencyContact.phone": {
    type: phoneSchema
  },
  "emergencyContact.relation": {
    type: String
  },
  "emergencyContact.timezone": {
    type: String, 
    allowedValues: [
      '(UTC-12) Eniwetok, Kwajalein', 
      '(UTC-11) Midway Island, Samoa', 
      '(UTC-10) Hawaii (US)', 
      '(UTC-9)  Alaska (US & Canada)', 
      '(UTC-8) Pacific Time (US & Canada)', 
      '(UTC-7) Mountain Time (US & Canada)', 
      '(UTC-6) Central Time (US & Canada)', 
      '(UTC-5) Eastern Time (US & Canada)', 
      '(UTC-4)  Atlantic Time (Canada)', 
      '(UTC-3:30) Canada/Newfoundland', 
      '(UTC-3) Brasilia, Buenos Aires, Georgetown', 
      '(UTC-2) Mid-Atlantic', 
      '(UTC-1) Azores, Cape Verde Is.', 
      '(UTC±0) Greenwich Mean Time (London, Lisbon)', 
      '(UTC+1) Amsterdam, Berlin, Paris, Rome, Madrid', 
      '(UTC+2) Athens, Helsinki, Istanbul, Cairo, E. Europe', 
      '(UTC+3) Baghdad, Kuwait, Nairobi, Moscow', 
      '(UTC+3:30) Tehran', 
      '(UTC+4) Abu Dhabi, Kazan, Muscat', 
      '(UTC+4:30) Kabul', 
      '(UTC+5) Islamabad, Karachi, Tashkent', 
      '(UTC+5:30) Bombay, Calcutta, New Delhi', 
      '(UTC+5:45) Nepal', 
      '(UTC+6) Almaty, Dhaka', 
      '(UTC+6:30) Cocos Islands, Yangon', 
      '(UTC+7) Bangkok, Jakarta, Hanoi', 
      '(UTC+8) Beijing, Hong Kong, Singapore, Taipei', 
      '(UTC+9) Tokyo, Osaka, Sapporto, Seoul, Yakutsk', 
      '(UTC+9:30) Adelaide, Darwin', 
      '(UTC+10) Brisbane, Melbourne, Sydney, Guam', 
      '(UTC+11) Magadan, Solomon Is., New Caledonia', 
      '(UTC+12) Fiji, Kamchatka, Marshall Is., Wellington'
    ]
  },

  medical: {
    type: Object,
    restricted: true,
    label: "Medical Information"
  },
  "medical.allergies": {
    type: [String], 
    optional: true
  },
  "medical.medications": {
    type: [String], 
    optional: true
  },
  "medical.notes": {
    type: String, 
    optional: true
  },

  skills: {
    type: [Object],
    optional: true,
    label: "Skills"
  },
  "skills.$._id": {
    type: String,
  },
  "skills.$.name": {
    type: String,
  },
  "skills.$.description": {
    type: String,
  }
});

userSchema = new SimpleSchema({
  _id: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/,
    // restricted: true,
    optional: true
  },
  emails: {
    type: [Object],
    restricted: true,
    label: "Email Addresses"
  },
  "emails.$.address": {
    type: String,
    regEx: EMAIL_REGEXP
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
  },
  roles: {
    type: [String],
    optional: true
  },
});

Meteor.users.attachSchema(userSchema);