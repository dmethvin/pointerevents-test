/*
 * As of 2013-04-11 there is only currently one pointerevent
 * implementation and it uses prefixed mixed-cap names.
 * To allow development of the tests, this file abstracts
 * out the names of the events and objects.
 */
 pointerPrefix = (function() {

	// Use maxTouchPoints as our feature detect
	if ( "maxTouchPoints" in window.navigator ) {
		return {
			vendorPrefixing: "",
			pointerdown: "pointerdown",
			pointerup: "pointerup",
			pointercancel: "pointercancel",
			pointermove: "pointermove",
			pointerover: "pointerover",
			pointerout: "pointerout",
			pointerenter: "pointerenter",
			pointerleave: "pointerleave",
			gotpointercapture: "gotpointercapture",
			lostpointercapture: "lostpointercapture",
			maxTouchPoints: "maxTouchPoints",
			PointerEvent: MSPointerEvent
		};		
	}
	else if ( "msMaxTouchPoints" in window.navigator ) {
		return {
			vendorPrefixing: "MSPointer",
			pointerdown: "MSPointerDown",
			pointerup: "MSPointerUp",
			pointercancel: "MSPointerCancel",
			pointermove: "MSPointerMove",
			pointerover: "MSPointerOver",
			pointerout: "MSPointerOut",
			pointerenter: "MSPointerEnter",
			pointerleave: "MSPointerLeave",
			gotpointercapture: "gotpointercapture",
			lostpointercapture: "lostpointercapture",
			maxTouchPoints: "msMaxTouchPoints",
			PointerEvent: MSPointerEvent
		};
	}
	else {
		//TODO: Assert no pointer events?
	}
 }());
 