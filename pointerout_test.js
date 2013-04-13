
// TA: 7.1  Pointing device is moved out of the hit test boundaries of an element


function check_PointerEvent(event) {

	test(function() {
		assert_true(event instanceof pointerPrefix["PointerEvent"],
				        "event is a PointerEvent event");
	}, event.type + " event is a PointerEvent event");
  
  function run() {
	  var target0 = document.getElementById("target0");
	  var test_pointerdown = async_test("pointerdown event received");
    
	  var pointerdown_event;
    
	  on_event(target0, pointerPrefix["pointerdown"], function(event) {
		  pointerdown_event = event;
		  check_PointerEvent(event);
      
		  detected_pointertypes[ event.pointerType ] = true;
	  });
    
    
}

