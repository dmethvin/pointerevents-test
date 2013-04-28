/*
 * As of 2013-04-11 there is only currently one pointerevent
 * implementation (Microsoft in Windows 8); it uses prefixed
 * mixed-cap for event names and prefixes its JavaScript
 * properties. To simplify development of the W3C tests,
 * this file abstracts names of the events and properties.
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
			pointerType: { "mouse": "mouse", "touch": "touch", "stylus": "stylus" },
			touchAction: "touchAction",
			PointerEvent: PointerEvent,
			setPointerCapture: "setPointerCapture",
			releasePointerCapture: "releasePointerCapture"
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
			gotpointercapture: "MSGotPointerCapture",
			lostpointercapture: "MSLostPointerCapture",
			maxTouchPoints: "msMaxTouchPoints",
			pointerType: { "mouse": 4, "touch": 2, "stylus": 99 },
			touchAction: "msTouchAction",
			PointerEvent: MSPointerEvent,
			setPointerCapture: "msSetPointerCapture",
			releasePointerCapture: "msReleasePointerCapture"
		};
	}
	else {
		//TODO: Assert no pointer events?
	}
}());
