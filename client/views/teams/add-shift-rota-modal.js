var createProperties,
    stepTwoInterval = null,
    stepThreeInterval = null
    currentStep = 1;

createProperties = {
  // step 1
  type: null,
  
  // step 2
  name: null, 
  numVolunteers: null,
  
  // step 3
  shiftLength: null,
  shiftHoursDays: 'hours',
  shiftFirstStartDate: null,
  shiftFirstStartTime: null,
  shiftLastStartDate: null,
  shiftLastStartTime: null,
  dailyDuration: null,
  dailyStart: null,
  dailyEnd: null,
  
  // step 4
  requiresApproval: false
};

var nextStep = function() {
  var current = '#rotaStep' + currentStep,
      next    = '#rotaStep' + (currentStep + 1);
      
  $(current).addClass('completed');
  $(next).addClass('visible');

  currentStep += 1;
};

var stepTwoCheck = function() {
  stepTwoInterval = setInterval(function() {
    if (createProperties.name 
      && createProperties.numVolunteers) {
      
      clearInterval(stepTwoInterval);
      nextStep();
      stepThreeCheck();
    }
  }, 500);
};

var stepThreeCheck = function() {
  stepThreeInterval = setInterval(function() {
    if (createProperties.shiftLength
      && createProperties.shiftHoursDays
      && createProperties.shiftFirstStartDate
      && createProperties.shiftFirstStartTime
      && createProperties.shiftLastStartDate
      && createProperties.shiftLastStartTime
      && (createProperties.dailyDuration === '24h' 
        || (createProperties.dailyDuration === 'limited'
          && createProperties.dailyStart
          && createProperties.dailyEnd
        )
      )
    ) {
      clearInterval(stepThreeInterval); 
      console.log(createProperties);
      nextStep();
    }
  }, 500);
};

var changeHandler = function(domId, propName, func) {
  $(domId).on('change', function(evt) {
    if (evt.currentTarget.value) {
      console.log('calling changeHandler() for ', domId, evt.currentTarget.value);
      createProperties[propName] = evt.currentTarget.value;
      
      if (func && typeof func === 'function') {
        func();
      }
    }
  });
}


Template.shiftRotaModal.rendered = function() {
  // initialize modal dialog
  $('#addShiftRotaModal').modal('setting', 'transition', 'vertical flip');

  // add placeholder text and validation pattern to elements with class='numeric'
  $('input.numeric')
    .attr('placeholder', '#')
    .attr('pattern', '\d\d');

  // initialize date and time pickers
  datePickerOptions = {
    // min: new Date(2015,5,1),
    // max: new Date(2015,6,31),
    // set: new Date(2015,5,1)
  };

  $('#shiftFirstStartDate')
    .pickadate({'today': ''})
    .pickadate('picker')
    .set(datePickerOptions);
  $('#shiftFirstStartTime')
    .pickatime()
    .pickatime('picker');
  $('#shiftLastEndDate')
    .pickadate({'today': ''})
    .pickadate('picker')
    .set(datePickerOptions);
  $('#shiftLastEndTime')
    .pickatime()
    .pickatime('picker');
   $('#dailyStart')
    .pickatime()
    .pickatime('picker');
   $('#dailyEnd')
    .pickatime()
    .pickatime('picker');
        
  // startDatePicker.set(datePickerOptions);
  // endDatePicker.set(datePickerOptions);
  
  
  // declare modal events inside rendered rather than Template.name.events
  // because semantic-ui pulls the modal out of the DOM tree on display 
  // which is bullshit, but well ... 
  
  // STEP ONE: create Shift or Rota? 
  changeHandler('.createType', 'type', function() {
    nextStep();

    $('#eventName')
      .attr('placeholder', createProperties.type.concat(' Name'))
      .focus();
      
      stepTwoCheck();
  });
  
  // STEP TWO: Name and # volunteers 
  changeHandler('#eventName', 'name');
  changeHandler('#numVolunteers', 'numVolunteers');
  
  // STEP THREE: time / date / duration details   
	changeHandler('#numLength', 'shiftLength');
	changeHandler('#durationOption', 'shiftHoursDays');
	changeHandler('#shiftFirstStartDate', 'shiftFirstStartDate');
	changeHandler('#shiftFirstStartTime', 'shiftFirstStartTime');
	changeHandler('#shiftLastEndDate', 'shiftLastStartDate');   
	changeHandler('#shiftLastEndTime', 'shiftLastStartTime');
	changeHandler('.dailyDuration', 'dailyDuration');
	changeHandler('#dailyStart', 'dailyStart');
	changeHandler('#dailyEnd', 'dailyEnd');
	
	// STEP FOUR: requires approval
	changeHandler('#requiresApproval', 'requiresApproval');
};
