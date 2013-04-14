setup({ explicit_done: true });

var detected_pointertypes = {};
add_completion_callback(showPointerTypes);


function showPointerTypes() {
	var complete_notice = document.getElementById("complete-notice");
	var pointertype_log = document.getElementById("pointertype-log");
	var pointertypes = Object.keys(detected_pointertypes);
	pointertype_log.innerHTML = pointertypes.length ?
		pointertypes.join(", ") : "(none)";
	complete_notice.style.display = "block";
}


// Check for conformance to PointerEvent interface
// TA: 1.1, 1.2, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12, 1.13
function check_PointerEvent(event) {
	test(function() {
		assert_true(event instanceof pointerPrefix["PointerEvent"],
				        "event is a PointerEvent event");
	}, event.type + " event is a PointerEvent event");

	// Check attributes for conformance to WebIDL:
	// * attribute exists
	// * has proper type
	// * if the attribute is "readonly", it cannot be changed
	// TA: 1.1, 1.2
	var idl_type_check = {
		"long": function( v ) { return typeof v === "number" && Math.round(v) === v; },
		"float": function( v ) { return typeof v === "number"; },
		"DOMString": function( v ) { return typeof v === "string"; },
		"boolean": function( v ) { return typeof v === "boolean" }
	};
	[
		["readonly", "long", "pointerId"],
		["readonly", "long", "width"],
		["readonly", "long", "height"],
		["readonly", "float", "pressure"],
		["readonly", "long", "tiltX"],
		["readonly", "long", "tiltY"],
		["readonly", "DOMString", "pointerType"],
		["readonly", "boolean", "isPrimary"]
	].forEach(function(attr) {
		var readonly = attr[0];
		var type = attr[1];
		var name = attr[2];

		// existence check
		test(function() {
			assert_true(name in event,
					        name + " attribute in " + event.type + " event");
		}, event.type + "." + name + " attribute exists");

		// readonly check
		if (readonly === "readonly") {
			test(function() {
				assert_readonly(event.type, name,
						            event.type + "." + name + " cannot be changed");
			}, event.type + "." + name + " is readonly");
		}

		// type check
		test(function() {
			assert_true(idl_type_check[type](event[name]),
					        name + " attribute of type " + type);
		}, event.type + "." + name + " IDL type " + type + " (JS type was " + typeof event[name] + ")");
	});

	// Check the pressure value
	// TA: 1.6, 1.7, 1.8
	test(function() {
		// TA: 1.6
		assert_greater_than_equal(event.pressure, 0,
				                      "pressure is greater than or equal to 0");
		assert_less_than_equal(event.pressure, 1,
				                   "pressure is less than or equal to 1");

		// TA: 1.7, 1.8
		if ( event.pointerType === pointerPrefix.pointerType["mouse"] ) {
			if ( event.buttons === 0 ) {
				assert_equals( event.pressure, 0,
						           "pressure is 0 for mouse with no buttons pressed");
			} else {
				assert_equals( event.pressure, 0.5,
						           "pressure is 0.5 for mouse with a button pressed");
			}
		}
	}, event.type + ".pressure value is valid" );

	// Check mouse-specific properties
	if ( event.pointerType === pointerPrefix.pointerType["mouse"] ) {
		// TA: 1.9, 1.10, 1.11, 1.13
		test(function() {
			assert_equals(event.tiltX, 0,
					          event.type + ".tiltX is 0 for mouse");
			assert_equals(event.tiltY, 0,
					          event.type + ".tiltY is 0 for mouse");
			assert_equals(event.pointerId, 1,
					          event.type + ".pointerId is 1 for mouse");
			assert_true(event.isPrimary,
					        event.type + ".isPrimary is true for mouse");
		}, event.type + " properties for pointerType=mouse");
		// Check properties for pointers other than mouse
	} else {
		// TA: 1.12
		test(function() {
			assert_true(event.pointerId !== 1,
					        event.type + ".pointerId is not 1 for " + event.pointerType);
		}, event.type + " properties for pointerType=" + event.pointerType);
	}
}
