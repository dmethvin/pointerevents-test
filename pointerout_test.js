detected = false;

// Harness 
function run() {
	var target0 = document.getElementById("target0");

	on_event(
    target0, 
    pointerPrefix["pointerout"], 
    function(event) {
      detected = true; 
	    detected_pointertypes["pointerout"] = true;

      // TA: 7.1  Pointing device is moved out of the hit test boundaries of an element
      test(
        function() {
	        assert_true(
            detected,
		        "pointerout event seen");
        }, 
        "pointerout");
      
	  });

}

