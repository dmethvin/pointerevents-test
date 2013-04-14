// Allow tests to run based on the type of device indicated 
var pointerTypeSelector = document.getElementById('pointerType'); 

on_event(
  pointerTypeSelector,
  'change',
  function(event) {
    createCookie('pointerType', event.target.value);
    alert('device changed: ' + event.target.value);
  });


