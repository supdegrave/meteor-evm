var shiftRotaProperties, 
    validateStep,
    validationFunctions,
    changeHandlerFunctions,
    nextStep,
    isNumeric,
    createShiftOrRota,
    
    currentStep = 1;

shiftRotaProperties = {
  // step 1
  type: null,
  
  // step 2
  name: null, 
  numVolunteers: null,
  
  // step 3
  shiftLength: null,
  shiftHoursDays: 'hours',  // default
  startDate: null,
  startTime: null,
  endDate: null,
  endTime: null,
  dailyDuration: null,
  dailyStart: "12:00 AM",   // requires init for 24h/limited validation to work 
  dailyEnd: "12:00 AM",     // requires init for 24h/limited validation to work 
  
  // step 4
  requiresApproval: false,  // default
};

validationFunctions = {
  3: function() {
    return shiftRotaProperties.dailyDuration === '24h' 
           || (shiftRotaProperties.dailyDuration === 'limited'
              && shiftRotaProperties.dailyStart
              && shiftRotaProperties.dailyEnd);
  }
};

changeHandlerFunctions = {
	dailyDuration: function() {
	  var limited = 'limited' === $('.dailyDuration:checked').val();

    $('#dailyStart').attr('disabled', !limited);
    $('#dailyEnd').attr('disabled', !limited);
	}, 
	numVolunteers: function(elem, key) {
	  isNumeric(elem, key);
	},
	shiftLength: function(elem, key) {
	  isNumeric(elem, key);
	}, 
	dailyStart: function(elem, key) {
	  console.log(elem, key);
    // $('#dailyEnd').pickatime('picker').set('select', 10 * 60)
	}
};

nextStep = function() {
  var current    = '#rotaStep' + currentStep,
      next       = '#rotaStep' + (currentStep + 1),
      nextButton = $('div.ui.positive.button'),
      nextIcon   = $('div.ui.positive.button > i');
      
  $(current).addClass('completed');
  $(next).addClass('visible');

  currentStep += 1;
  
  if (currentStep < 4) {
    nextButton.addClass('disabled');
  }
  else {
    nextIcon.removeClass('chevron right');
    nextIcon.addClass('checkmark');
    nextButton.children('span').text('Create');
  }
};

validateStep = function() {
  var stepId         = '#rotaStep' + currentStep,
      selector       = stepId + ' input, ' + stepId + ' select',
      keys           = _.uniq(_.map($(selector), function(elem) { return elem.dataset.key; })), 
      keysValid      = true
      validationFunc = validationFunctions[currentStep];
      
  _.each(keys, function(key) {
    keysValid = keysValid && shiftRotaProperties[key];
  });
  
  if (keysValid && (!validationFunc || validationFunc())) {
    keysValid = true;
    $('div.ui.positive.button').removeClass('disabled');
  }
};

isNumeric = function(elem, key) {
  if (isNaN(parseInt(elem.value))) {
    shiftRotaProperties[key] = null;
    elem.value = '';
    elem.focus();
  }
}

createShiftOrRota = function(evt, tmpl) {  
  // var id                = currentTeam._id + "_" + $('#shiftName').val(), 
  //     rotaStartDateTime = new Date(shiftRotaProperties.startDate + ' ' + shiftRotaProperties.startTime),
  //     rotaEndDateTime   = new Date(shiftRotaProperties.endDate + ' ' + shiftRotaProperties.endTime),
  //     getEndDateTime    = function(dtStart, hours) {
  //       var dtEnd = new Date(dtStart);
  //       dtEnd.setTime(dtEnd.getTime() + (hours*60*60*1000)); 
  //       return dtEnd;
  //     }, 
  //     dtStart,
  //     dtEnd,
  //     newEvent;
  
  if ("Shift" === shiftRotaProperties.type) {
    console.log('shift', shiftRotaProperties);
    // createEvent(shiftRotaProperties);
  }
  else if ("Rota" === shiftRotaProperties.type) {
    console.log('rota', shiftRotaProperties);
    // Rotas.insert({name: shiftRotaProperties.name, teamId: currentTeam._id});
    // 
    // for (dtStart = rotaStartDateTime; dtStart < rotaEndDateTime;) {
    //   dtEnd = getEndDateTime(dtStart, length);
    // 
    //   newEvent = new Event(title, id, dtStart, dtEnd);
    //   
    //   // custom properties for Nowhere EVM
    //   newEvent.teamId = currentTeam._id, // allows searching for team-specific rotas
    //   newEvent.requiresApproval = requiresApproval,
    //   newEvent.spacesAvailable = spacesAvailable,
    //   newEvent.volunteers = [], // array of simple user objects, to simplify display = {_id = int, name = string }
    //   newEvent.requests = [], // array of userId integers
    // 
    //   Events.insert(newEvent);
    // 
    //   // increment loop position
    //   dtStart = dtEnd;
    // }
  }
  
  // dailyDuration: "24h" || "limited"
  // dailyEnd: "00:00"
  // dailyStart: "00:00"
  // name: "fnord"
  // numVolunteers: "4"
  // requiresApproval: "on" || false
  // startDate: "29 December, 2014"
  // startTime: "00:00"
  // shiftHoursDays: "hours"
  // endDate: "12 January, 2015"
  // endTime: "00:00"
  // shiftLength: "6"
  // type: "Shift" || "Rota"
};

Template.shiftRotaModalContent.events({
  'change input, change select, input .numeric': function(evt, tmpl) {
    var target     = evt.currentTarget, 
        key        = target.dataset.key,
        changeFunc = changeHandlerFunctions[key];
    
    if (key) {
      shiftRotaProperties[key] = target.value;

      if (changeFunc) {
        changeFunc(target, key);
      }
      
      validateStep();
    }
  },
});

Template.shiftRotaModalContent.rendered = function() {
  // initialize modal dialog
  $('#addShiftRotaModal')
    .modal('setting', 'transition', 'vertical flip')
    .modal({
      // // initialization on display of modal 
      // onShow: function() {
      // },
      // cancel button functionality
      onDeny: function() {
        console.log('cancel');
      },
      // create button functionality 
      onApprove: function() {
        if (currentStep < 4) {        
          nextStep();
          return false;
        }
        else {
          createShiftOrRota();
          return false;
        }
      }
    });

  // set focus on first input 
  // $('#rotaStep1 input:first').focus(); // doesn't set focus for some reason

  // add placeholder text to elements with class='numeric'
  $('input.numeric').attr('placeholder', '#');

  // initialize date and time pickers
  // because JS stupidly uses 0-indexed months, 5 is June instead of 6, etc
  datePickerOptions = {
    // min: new Date(2015,5,1),
    // max: new Date(2015,6,31),
    // set: new Date(2015,5,1)
  };

  $('#startDate')
    .pickadate({'today': ''})
    .pickadate('picker')
    .set(datePickerOptions);
  $('#startTime')
    .pickatime({format: 'HH:i'})
    .pickatime('picker');
  $('#endDate')
    .pickadate({'today': ''})
    .pickadate('picker')
    .set(datePickerOptions);
  $('#endTime')
    .pickatime({format: 'HH:i'})
    .pickatime('picker');
   $('#dailyStart')
    .pickatime({format: 'HH:i'})
    .pickatime('picker');
   $('#dailyEnd')
    .pickatime({format: 'HH:i'})
    .pickatime('picker');
        
  // startDatePicker.set(datePickerOptions);
  // endDatePicker.set(datePickerOptions);
};
