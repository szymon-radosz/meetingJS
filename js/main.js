//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveMeeting);

function saveMeeting(e) {
    //values
    var meetingDate = document.getElementById('meetingDate').value;
    var meetingPerson = document.getElementById('meetingPerson').value;
    var meetingPurpose = document.getElementById('meetingPurpose').value;
    var meetingWarning = document.getElementById('meetingWarning').value;

    var meeting = {
        date: meetingDate,
        person: meetingPerson,
        purpose: meetingPurpose,
        warning: meetingWarning
    };

    if(localStorage.getItem('meetings') === null){
        // Init array
        var meetings = [];
        // Add to array
        meetings.push(meeting);
        // Set to localStorage
        localStorage.setItem('meetings', JSON.stringify(meetings));
    } else {
        // Get meetings from localStorage
        var meetings = JSON.parse(localStorage.getItem('meetings'));
        // Add meeting to array
        meetings.push(meeting);
        // Re-set back to localStorage
        localStorage.setItem('meetings', JSON.stringify(meetings));
    }

    // Clear form
    document.getElementById('myForm').reset();

    // Re-fetch meetings
    fetchMeetings();

    //prevent default to prevent hide result in the console
    e.preventDefault();
}

// Delete bookmark
function deleteMeeting(purpose){
    // Get meetings from localStorage
    var meetings = JSON.parse(localStorage.getItem('meetings'));
    // Loop throught meetings
    for(var i =0;i < meetings.length;i++){
        if(meetings[i].purpose == purpose){
            // Remove from array
            meetings.splice(i, 1);
        }
    }
    // Re-set back to localStorage
    localStorage.setItem('meetings', JSON.stringify(meetings));

    // Re-fetch meetings
    fetchMeetings();
}


// Fetch bookmarks
function fetchMeetings(){
    var meetings = JSON.parse(localStorage.getItem('meetings'));
    var meetingsResults = document.getElementById('meetingsResults');

    // Build output
    meetingsResults.innerHTML = '';
    for(var i = 0; i < meetings.length; i++){
        var date = meetings[i].date;
        var person = meetings[i].person;
        var purpose = meetings[i].purpose;
        var warning = meetings[i].warning;


        meetingsResults.innerHTML += '<div class="col-sm-12 mettingDiv ' + warning + '">'+
            '<h3>Date: '+date+'</h3>'+
            '<h3>Person: '+person+'</h3>' +
            '<h3>Purpose: '+purpose+'</h3>'+
            '<h3 class="importance">Importance: '+warning+'</h3>'+
            ' <a onclick="deleteMeeting(\''+purpose+'\')" class="btn btn-danger" href="#">Delete</a> ' +
            '</div>';
    }
}


