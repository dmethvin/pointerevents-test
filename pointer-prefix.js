/*
 * As of 2013-04-11 there is only currently one pointerevent
 * implementation (Microsoft in Windows 8); it uses prefixed
 * mixed-cap names. To allow development of the W3C tests,
 * this file abstracts the names of the events and objects.
 */
 pointerPrefix = (function() {

	// Use maxTouchPoints as our feature detect; this will
	// probably need tweaking with new implementations.
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
			touchAction: "touch-action",
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
			touchAction: "-ms-touch-action",
			PointerEvent: MSPointerEvent
		};
	}
	else {
		//TODO: Assert no pointer events?
	}
 }());
 