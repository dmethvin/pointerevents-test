// Allow tests to run based on the type of device indicated 
var pointerTypeSelector = document.getElementById('pointerType'); 


on_event(
  pointerTypeSelector,
  'change',
  function(event) {
    createCookie('pointerType', event.target.value);
    alert('device changed: ' + event.target.value);
  });

// Log events 

var body = document.getElementsByTagName('body')[0]; 

logger = document.getElementById('logger'); 
logger.innerHTML = 'initialized'; 
  


// Bind all events 

var pointerEvents = 'pointerdown,pointerup,pointercancel,pointermove,pointerover,pointerout,pointerenter,pointerleave,gotpointercapture,lostpointercapture'.split(',');

// var pointerEvents = 'mousedown,mouseup,mousecancel,mousemove,mouseover,mouseout,mouseenter,mouseleave,gotmousecapture,lostmousecapture'.split(',');

for (var i = 0; i < pointerEvents.length; i++)  {
  logger.innerHTML = 'initialized:' + pointerEvents[i]; 

  on_event(
    body,
    pointerEvents[i],
    function(event) {
      logger.innerHTML = event.type + '@' + event.x + 'x' + event.y; 
    })


}

