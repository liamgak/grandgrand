var timeline;
var data;
var dataRelated;
var lastEventId = 1;
var prevSelectedDotDiv = null;
var eventToItemMapping = {};
// Called when the Visualization API is loaded.
function drawVisualization() {

//YELLOW: others, GREEN: verified, GREEN-M: related, RED:.
//if not 본인, yellow never used
    // Create a JSON data table
    data = [
        {
            'start': new Date(2018,7,23),
            'content': '',
            'className': 'yellow',
            'event_id': 1
        },

        {
            'start': new Date(2018,7,24),
            'content': '',
            'className': 'yellow',
            'event_id': 2
        },

        {
            'start': new Date(2018,7,25),
            'content': '#1',
            'className': 'green-m',
            'event_id': 3
        },

        {
            'start': new Date(2018,7,26),
            'content': '',
            'className': 'yellow',
            'event_id': 4
           
        },

        {
            'start': new Date(2018,7,29),
            'content': '',
            'className': 'yellow',
            'event_id': 5
        },

        {
            'start': new Date(2018,7,30),
            'content': '',
            'className': 'yellow',
            'event_id': 6
        },

        {
            'start': new Date(2018,8,4),
            'content': '#2',
            'className': 'green-m',
            'event_id': 7
        },

        {
            'start': new Date(2018,8,5),
            'content': '#3',
            'className': 'green',
            'event_id': 8
        },

        {
            'start': new Date(2018,8,6),
            'content': '',
            'className': 'yellow',
            'event_id': 9
        },

        {
            'start': new Date(2018,8,9),
            'content': '#4',
            'className': 'green-m',
            'event_id': 10
        }
    ];

    dataRelated = [

        {
            'start': new Date(2018,7,24),
            'content': '',
            'className': 'green-m',
            'event_id': 2
        },


        {
            'start': new Date(2018,8,4),
            'content': '',
            'className': 'green-m',
            'event_id': 7
        },

        {
            'start': new Date(2018,8,5),
            'content': '',
            'className': 'green',
            'event_id': 8
        },


        {
            'start': new Date(2018,8,9),
            'content': '',
            'className': 'green-m',
            'event_id': 10
        }


    ];

    // specify options
    var options = {
        'width':  '100%',
        'height': '125px',
        'start': new Date(2012, 0, 1),
        'end': new Date(2012, 0, 31),
        'cluster': true,
        'locale': 'en',
        'clusterMaxItems': 1,
        'zoomMin': 1000*60*60,
        'showNavigation': true,
        'zoomable': true
    };

    // Instantiate our timeline object.
    timeline = new links.Timeline(document.getElementById('mytimeline'), options);            
    // Draw our timeline with the created data and options
    timeline.draw(data);

    bindEventHoverEvent();

    $(window).resize(function() {
        timeline.redraw();
    });
}
function bindEventHoverEvent() {
    $('.event').on("mouseenter", function(event){
       $('.timeline-event-dot').removeClass("hovered");
       var id = $(this).attr('id').replace(/[^\d]+/img, '');
       eventToItemMapping[id].forEach(function(el) {
         $(el).addClass('hovered');
       });
    });

    $('.event').on("mouseleave", function(event){
       var id = $(this).attr('id').replace(/[^\d]+/img, '');
       eventToItemMapping[id].forEach(function(el) {
         $(el).removeClass('hovered');
       });
    });            
}

function mouseoverItemEventCallback(eventId) {
   $('.event').removeClass("highlighted");
   $('#event_id_'+eventId).addClass("highlighted");
}

function clickItemEventCallback(eventId, dotDiv){
     $('.timeline-event-dot').removeClass("selected");
     if($(prevSelectedDotDiv)){
        $(prevSelectedDotDiv).removeClass("selected");
     }
     $(dotDiv).addClass("selected");
     prevSelectedDotDiv = dotDiv;
     $('.events').scrollTo('#event_id_'+ eventId, { duration : 'slow' });
}

function itemToEventMapCallback(eventId, dotDiv, eventIds) {
    eventIds.push(eventId);
    eventIds.forEach(function(evtId){

    if(eventToItemMapping.hasOwnProperty(evtId)) {
        eventToItemMapping[evtId].push(dotDiv);
    } else {
        eventToItemMapping[evtId] = [dotDiv];
    }

    });
}

function itemArialLabelCallback(divDot, className, eventDate, content) {
    //var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    //monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var eventType = (className == 'green') ? "Ok" :
                     (
                        (className == 'green-m') ? "Maintenance" :
                           (
                            (className == 'yellow') ? "Warning" : "Error"
                        )
                    );
    //var formattedDate = monthNames[eventDate.getMonth()] + " " + eventDate.getDate() + " " + eventDate.getFullYear();
    var dd = eventDate.getDate();
    var mm = eventDate.getMonth()+1; 
    var yyyy = eventDate.getFullYear();
    if(dd < 10) {
        dd='0' + dd
    } 
    if(mm < 10) {
        mm='0'+mm
    } 
    var formattedDate = dd+'/'+mm+'/'+yyyy;
    divDot.setAttribute("aria-label", "Event type " + eventType + " on " +  formattedDate);
}


/**
 * Zoom
 * @param zoomVal
 */
function zoom(zoomVal) {
    timeline.zoom(zoomVal);
    timeline.trigger("rangechange");
    timeline.trigger("rangechanged");
}

/**
 * Adjust the visible time range such that all events are visible.
 */
function adjustVisibleTimeRangeToAccommodateAllEvents() {
    timeline.setVisibleChartRangeAuto();
}

/**
 * Move
 * @param moveVal
 */
function move(moveVal) {
    timeline.move(moveVal);
    timeline.trigger("rangechange");
    timeline.trigger("rangechanged");
}

/**
 * Move the visible range such that the current time is located in the center of the timeline.
 */
function moveToCurrentTime() {
    timeline.setVisibleChartRangeNow();
}

function adjustVisibleRangeRelated(){
    var items = dataRelated,
        min = undefined,
        max = undefined;

    if (items) {
        for (var i = 0, iMax = items.length; i < iMax; i++) {
            var item = items[i],
                start = item.start != undefined ? item.start.valueOf() : undefined,
                end   = item.end != undefined   ? item.end.valueOf() : start;

            if (start != undefined) {
                min = (min != undefined) ? Math.min(min.valueOf(), start.valueOf()) : start;
            }

            if (end != undefined) {
                max = (max != undefined) ? Math.max(max.valueOf(), end.valueOf()) : end;
            }
        }
    }

    if(items.length == 1){
        var range = timeline.getDataRange(true);
        var diff = range.max-range.min;

        min = min - diff * 0.15;
        max = max + diff * 0.15;
     
        timeline.setVisibleChartRange(min, max);
    }

    if (min && max) {
        // zoom out 5% such that you have a little white space on the left and right
        var diff = (max - min);
        min = min - diff * 0.15;
        max = max + diff * 0.15;
        
        timeline.setVisibleChartRange(min, max);
    }   

    
}