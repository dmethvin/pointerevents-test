detected = false;

on_event(target0, pointerPrefix["pointerdown"], function(event) {
	detected_pointertypes[ event.pointerType ] = true;
});

// Harness 
function run() {
	var target0 = document.getElementById("target0");

	on_event(
    target0, 
    pointerPrefix["pointerdown"], 
    function(event) {
      detected = true; 
	    detected_pointertypes["pointerdown"] = true;

      // TA: 7.1  Pointing device is moved out of the hit test boundaries of an element
      test(
        function() {
	        assert_true(
            detected,
		        "pointerdown event seen");
        }, 
        "pointerdown");
      
	  });

}

