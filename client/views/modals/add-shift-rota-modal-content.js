var eventProps, 
    validateStep,
    validationFunctions,
    changeHandlerFunctions,
    nextStep,
    isNumeric,
    createShiftOrRota,
    createRotaEvents,
    
    currentStep = 1;

eventProps = {
  teamId: null,
  
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
    return eventProps.dailyDuration === '24h' 
           || (eventProps.dailyDuration === 'limited'
              && eventProps.dailyStart
              && eventProps.dailyEnd);
  }
};

changeHandlerFunctions = {
	dailyDuration: function(elem, key) {
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
  // dailyStart: function(elem, key) {
  //   console.log(elem, key);
  //     // $('#dailyEnd').pickatime('picker').set('select', 10 * 60)
  // }
};

nextStep = function() {
  var current    = '#rotaStep' + currentStep,
      next       = '#rotaStep' + (currentStep + 1),
      nextButton = $('div.ui.positive.button'),
      nextIcon   = $('div.ui.positive.button > i');
      
  $(current).addClass('completed');
  $(next).addClass('visible');
  
  $(next + ' input:first').focus();

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
    keysValid = keysValid && eventProps[key];
  });
  
  if (keysValid && (!validationFunc || validationFunc())) {
    keysValid = true;
    $('div.ui.positive.button').removeClass('disabled');
  }
};

isNumeric = function(elem, key) {
  if (isNaN(parseInt(elem.value))) {
    eventProps[key] = null;
    elem.value = '';
    elem.focus();
  }
};

createShiftOrRota = function(evt, tmpl) {  
  var startDay, 
      endDay, 
      startHourMin, 
      endHourMin;
  
  if ("Shift" === eventProps.type) {
    Events.insert(new Event(eventProps));
  }
  else if ("Rota" === eventProps.type) {
    Rotas.insert({name: eventProps.name, teamId: eventProps.teamId});
    
    // rota shifts run 24 hours a day
    if ($('#duration24h:checked').length) {
      createRotaEvents(
        eventProps.startDate + ' ' + eventProps.startTime,
        eventProps.endDate + ' ' + eventProps.endTime
      );
    }
    // rota shifts are limited in duration (example: 08:00 - 20:00)
    else {
      startDay = new Date(eventProps.startDate);
      endDay   = new Date(eventProps.endDate);

      for (; startDay < endDay; startDay.setHours(startDay.getHours() + 24)) {         
        startHourMin = eventProps.dailyStart.split(':');
        endHourMin   = eventProps.dailyEnd.split(':');

        createRotaEvents(
          startDay.setHours(startHourMin[0], startHourMin[1]),
          startDay.setHours(endHourMin[0], endHourMin[1])
        );
      }
    }
  }
};

createRotaEvents = function(startDateTime, endDateTime) {
  var dtStart, 
      dtEnd, 
      getEndDateTime; 
      
  startDateTime = new Date(startDateTime);
  endDateTime   = new Date(endDateTime);
      
  for (dtStart = startDateTime; dtStart < endDateTime;) {
    dtEnd = new Date(dtStart.getTime() + (eventProps.shiftLength*60*60*1000));
    Events.insert(new Event(eventProps, dtStart, dtEnd));
      
    // increment loop position
    dtStart = dtEnd;
  }  
};


Template.shiftRotaModalContent.events({
  'change input, change select, input .numeric': function(evt, tmpl) {
    var target     = evt.currentTarget, 
        key        = target.dataset.key,
        changeFunc = changeHandlerFunctions[key];
    
    if (key) {
      eventProps[key] = target.value;

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
      // initialization on display of modal 
      onShow: function() {
        // set up 'Enter' key listener 
        this.addEventListener('keyup', function(evt) {
          
          // Enter key pressed & Next button is enabled
          if (evt.keyIdentifier === "Enter" && !_.contains(btnNext.classList, 'disabled')) {
            btnNext.click();
          }
        });
      },
      // cancel button functionality
      onDeny: function() {
        console.log('cancel');
        this.removeEventListener('keyup');
      },
      // create button functionality 
      onApprove: function() {
        if (currentStep < 4) {        
          nextStep();
          return false;
        }
        else {
          createShiftOrRota();
          // TODO: these should only occur on successful creation 
          this.removeEventListener('keyup');
          return true;
        }
      }
    });
    
  eventProps.teamId = currentTeam._id;  
  eventProps.teamName = currentTeam.name;

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
