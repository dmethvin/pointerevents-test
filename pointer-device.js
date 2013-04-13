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

function logEvent(event) { 
  if (event.type && event.x && event.y) { 
    logger.innerHTML = event.type + '@' + event.x + 'x' + event.y; 
    console.log(event.pointerId + event.type + '@' + event.x + 'x' + event.y);
  } else { 
    logger.innerHTML ='Event';
  }
}

// Bind all events 
// var pointerEvents =
// 'pointerdown,pointerup,pointercancel,pointermove,pointerover,pointerout,pointerenter,pointerleave,gotpointercapture,lostpointercapture'.split(',');

var pointerEvents = []; 

for (var i = 0; i < pointerEvents.length; i++)  {
  logger.innerHTML = 'initialized:' + pointerEvents[i]; 

  on_event(
    body,
    pointerPrefix[pointerEvents[i]],
    function(event) {
      logEvent(event);
    })


}

