// json 
//onclick(send hash data)
//get json

// var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         var myObj = JSON.parse(this.responseText);
//         document.getElementById("demo").innerHTML = myObj.name;
//     }
// };
// xmlhttp.open("GET", "json_demo.txt", true);
// xmlhttp.send();


//전체 timeline순으로 받는데 related flag 사용,

//look up
var ourCode = "3cR8vf1GDUAPvbBqHW7pmTBjZ2mCqX4Gic4QNiK7N6mj";

function hresult(){
	var userinput = document.getElementById("doc-code").value;
	if (userinput.length != 44){
		alert("This is not a valid code.")
	}
	else if (userinput == ourCode){
		location.href="resultm";
	}
	// else {
	// 	location.href="resultnm";
	// }
}


function drawVisualization2() {

//YELLOW: others, GREEN: verified, GREEN-M: related, RED:.
//if not 본인, yellow never used
    // Create a JSON data table
    data = [
        {
            'start': new Date(2018,7,23),
            'content': '',
            'className': 'red',
            'event_id': 1
        },

        {
            'start': new Date(2018,7,24),
            'content': '',
            'className': 'red',
            'event_id': 2
        },

        {
            'start': new Date(2018,7,25),
            'content': '',
            'className': 'red',
            'event_id': 3
        },

        {
            'start': new Date(2018,7,26),
            'content': '',
            'className': 'red',
            'event_id': 4
           
        },

        {
            'start': new Date(2018,7,29),
            'content': '',
            'className': 'red',
            'event_id': 5
        },

        {
            'start': new Date(2018,7,30),
            'content': '',
            'className': 'red',
            'event_id': 6
        },

        {
            'start': new Date(2018,8,4),
            'content': '',
            'className': 'red',
            'event_id': 7
        },

        {
            'start': new Date(2018,8,5),
            'content': '',
            'className': 'red',
            'event_id': 8
        },

        {
            'start': new Date(2018,8,6),
            'content': '',
            'className': 'red',
            'event_id': 9
        },

        {
            'start': new Date(2018,8,9),
            'content': '',
            'className': 'red',
            'event_id': 10
        }
    ];

    dataRelated = [

        {
            'start': new Date(2018,7,23),
            'content': '',
            'className': 'red',
            'event_id': 1
        },

        {
            'start': new Date(2018,7,24),
            'content': '',
            'className': 'red',
            'event_id': 2
        },

        {
            'start': new Date(2018,7,25),
            'content': '',
            'className': 'red',
            'event_id': 3
        },

        {
            'start': new Date(2018,7,26),
            'content': '',
            'className': 'red',
            'event_id': 4
           
        },

        {
            'start': new Date(2018,7,29),
            'content': '',
            'className': 'red',
            'event_id': 5
        },

        {
            'start': new Date(2018,7,30),
            'content': '',
            'className': 'red',
            'event_id': 6
        },

        {
            'start': new Date(2018,8,4),
            'content': '',
            'className': 'red',
            'event_id': 7
        },

        {
            'start': new Date(2018,8,5),
            'content': '',
            'className': 'red',
            'event_id': 8
        },

        {
            'start': new Date(2018,8,6),
            'content': '',
            'className': 'red',
            'event_id': 9
        },

        {
            'start': new Date(2018,8,9),
            'content': '',
            'className': 'red',
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