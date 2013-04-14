// Harness 
function run() {

  // Page setup 
  var target0 = document.getElementById("target0");
  var event_tested  = "pointerout";

  // Event logging 
  // Check each of the unique pointer events 
  // id: {events: [], pointerType: pen} 
  eventStream = {}; 

  // Log all events  
  var pointerEvents = 'pointerdown,pointerup,pointercancel,pointermove,pointerover,pointerout,pointerenter,pointerleave,gotpointercapture,lostpointercapture'.split(',');
  for (var i = 0; i < pointerEvents.length; i++)  {
    //    console.log(pointerEvents[i] + ' logging on body');
    on_event(
      document.getElementsByTagName('body')[0],
      pointerPrefix[pointerEvents[i]],
      function(event) {
        //        console.log(event.pointerId + event.type);
        if (eventStream[event.pointerId]) { 
          eventStream[event.pointerId].events.push(event.type);
        } else { 
          eventStream[event.pointerId] = {
            events: [event.type],
            pointerType: event.pointerType
          };
        }
      });
  }

  // Test Assertions for pointerout events

  // TA: 7.1  Pointing device is moved out of the hit test boundaries
  // of an element
  detected71 = false;
	on_event(
    target0, 
    pointerPrefix[event_tested], 
    function(event) {
      detected71 = true; 
	    detected_pointertypes[event_tested] = true;
      test(
        function() { 
	        assert_true(
            detected71,
		        event_tested + " event seen");
        }, 
        '7.1  Pointing device is moved out of the hit test boundaries of an element');
	  });


  // TA: 7.5 When touch, a device that does not support hover, after
  // firing the pointerup event the pointerout event must be
  // dispatched.
  setTimeout(
    function () {
      test(
        function() {
          for (var pointer in eventStream) {
            // console.log('eventStream:' + eventStream[pointer].pointerType);
            if (eventStream[pointer].pointerType === pointerPrefix.pointerType['touch']) { 
              eventStream[pointer].events.forEach(
                function(e, i, c) { 
                  if (e === pointerPrefix['pointerup']) {
                    // console.log('FAIL: pointerout not after pointerup on no-hover device:' + c);
                    assert_equals( 
                      c[i + 1],
                      pointerPrefix['pointerout']);
                  }
                }
              );
            }
          }
        },
        '7.5   When touch, a device that does not support hover, after firing the pointerup event the pointerout event must be dispatched.'
      )
    }, 2000);


  // TA: 7.6	 After firing the pointercancel event the pointerout
  // event must be dispatched.	
  setTimeout(
    function () {
      //      console.log(JSON.stringify(eventStream));
      test(
        function() {
          for (var pointer in eventStream) {
            //      console.log('eventStream:' + pointer);
            eventStream[pointer].events.forEach(
              function(e, i, c) { 
                if (e === pointerPrefix['pointercancel']) {
                  // console.log('FAIL: pointerout not after pointercancel:' + c);
                  // Not checking end of array works here since
                  // pointercancel shouldn't be last
                  assert_equals( 
                    c[i + 1],
                    pointerPrefix['pointerout']);
                }
              }
            );
          }
        },
        '7.6 After firing the pointercancel event the pointerout event must be dispatched.'
      )
    }, 2000);
  
}

