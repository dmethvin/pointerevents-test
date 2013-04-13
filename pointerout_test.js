// Pointer out 
detected = false;

// Harness 
function run() {

  // Check each of the unique pointer events 
  // id: [activityList] 
  eventStream = {}; 

  function checkEventStream() { 
    for (var pointer in eventStream) {
      console.log('eventStream:' + pointer);
      eventStream[pointer].forEach(
        function(e, i, c) {
          if (e === pointerPrefix['pointercancel']) {
            assert_equals( 
              c[i + 1],
              pointerPrefix['pointerout']);
          }
        });
    }
  }; 
  
 
  // Log all events  
  var pointerEvents = 'pointerdown,pointerup,pointercancel,pointermove,pointerover,pointerout,pointerenter,pointerleave,gotpointercapture,lostpointercapture'.split(',');

  for (var i = 0; i < pointerEvents.length; i++)  {
    on_event(
      body,
      pointerPrefix[pointerEvents[i]],
      function(event) {
        console.log(event.pointerId + event.type);
        if (eventStream[event.pointerId]) { 
          eventStream[event.pointerId].push(event.type);
        } else { 
          eventStream[event.pointerId] = [event.type];
        }
      })
  }

	var target0 = document.getElementById("target0");

  var event_tested  = "pointerout";

	on_event(
    target0, 
    pointerPrefix[event_tested], 
    function(event) {

      detected = true; 
	    detected_pointertypes[event_tested] = true;

      // TA: 7.1  Pointing device is moved out of the hit test boundaries of an element
      test(
        function() { 
	        assert_true(
            detected,
		        event_tested + " event seen");
        }, 
        '7.1  Pointing device is moved out of the hit test boundaries of an element');
      


	  });

  // TA: 7.6	 After firing the pointercancel event the pointerout
  // event must be dispatched.	
  console.log(JSON.stringify(eventStream));
  var stTest = async_test('7.6 After firing the pointercancel event the pointerout event must be dispatched.');
  setTimeout(
    function () {
      checkEventStream(); 
      stTest.step(
        function () {
        }
      );
      stTest.done();
    }, 2000);

}

