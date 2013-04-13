detected = false;

// Harness 
function run() {

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
        event_tested);
      
	  });

}

