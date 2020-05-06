function anotherAddEventListener(typeOfEvent,callback ){

    //detect event code...
    
    var eventThatHappened = {
        eventType: "keypress",
        key: "p",
        durationOfKeypress: 2 
    }
    if (eventThatHappened.eventType === typeOfEvent) {
    
    callback(eventThatHappened);
    }
    
    }
   
    function anotherAddEventListener("keydown", function (event) {
        console.log(event);
    });
    