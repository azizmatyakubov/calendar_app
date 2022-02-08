// Tips for naming variables:
// If it is a boolean, use a question: isDaySelected
// If you name a function: always use an imperative verb, because you are ordering the code to do something
// If it is a DOM element (i.e, a reference to a tag) end the variable name with Node or with Tag
// Otherwise --> just find a meaningful name FOR YOU, ask yourself "What is this?" and the name should be the answer to this question


/* DATA FOR THE APPOINTMENTS
ENTITIES:
-- Appointment --> attribute: time, description
-- Day         --> attribute: number
-- Month (in our case, we only have one month of 31 days)
RELATIONSHIPS:
-- One day can have zero or more meetings ( 1-to-N relationship / one to many)
-- One month can have more days     (1-to-N relationship / one to many )
(You will learn to do Entity-Relationship models)
IN JS:
--> Appointment:  an object, { time: '09:00', description: 'Live lecture' }
--> Day:          [
    { time: '09:00', description: 'Live lecture' },
    { time: '20:00', description: 'Dinner' }
 ]
let appoitmentExample = {
    time: '09:00', // TODO in the future, this must be a Date, right now let's use a string
    description: 'Live Lecture'
}
let day = [
    {
        time: '09:00', // TODO in the future, this must be a Date, right now let's use a string
        description: 'Live Lecture'
    },
    { time: '20:00', description: 'Dinner' }
]
let monthCalendarExample = [
    [{ time: '20:00', description: 'Dinner' }, { time: '09:00', description: 'Live lecture' }], // First day
    [], // Second day
    [], // Third day...
]
*/

// We don't know how many meetings we have in a day...
// But we know we only have 31 days in a month
// We know the exact number of days, we can use an object
let calendar = { } // See example below.
// This calendar will be initialized in the createDays function

    // Example:
    // calendar = {
    //      "1": [{ time: '09:00', description: 'Live lecture' }, { time: '20:00', description: 'Dinner' }], // First day
    //      "2": [], // Second day
    //      "12": [{ time: '20:00', description: 'Dinner' } ]
    //  }

// TODO persist the data so that it does not get lost at page reload

const onLoad = function() {
    // We execute ANY CODE that must be executed just after page load
    // Initialization of data, etc. etc.
    // Never execute function right away in JS, outside any other function.
    // Use window.onload...

    createDays()
}
// We tell the browser to execute the function above, on page load
window.onload = onLoad // We assigned our onLoad function to the browser onload.

const displayMeetingsForDay = function(dayNumberAsString) {

    // 1) Access the object and read all the appointments for a day
    let meetingsForTheDay = calendar[dayNumberAsString]

    // 2) Loop through them and we display each one of them
    let appointmentsNode = document.getElementById("appointments")
    appointmentsNode.innerHTML = ''

    for (let meeting of meetingsForTheDay) {
        // 1) We create a node
        let meetingLiNode = document.createElement('li')

        // 2) We customize it
        meetingLiNode.innerText = `${meeting.time} >> ${meeting.description}`

        // 3) We attach it
        appointmentsNode.appendChild(meetingLiNode)
    }
}

const selectDay = function(event) {
    // Let's de-select the previously selected day
    // 1) Find the day that we selected
    let currentlySelectedDayNode = document.querySelector(".selected")
    // Or document.getElementsByClassName("selected")[0] --> the first (and only) element with class .selected
    // Remember that querySelector always returns the first element it finds, while getElementsByClassName returns more than one

    // 2) De-select it
    if(currentlySelectedDayNode !== null) {
        currentlySelectedDayNode.classList.remove('selected')
    }

    // 3) Let's get the new day we clicked on, the where the event happened
    let clickedDayNode = event.target // The event.target attribute ALWAYS returns the node where the event was triggered by the user

    // 4) Let's add the selected class
    clickedDayNode.classList.add('selected')

    // We could have styled it here
    // BUT WE DON'T WANT TO WRITE STYLE IN JAVASCRIPT
    // clickedDayNode.style.color = "red"
    // clickedDayNode.style.borderColor = "red"
    // We want to decouple as much as possible structure, functionalities, and styles
    // HTML - JS - CSS


    // 5) Display the meeting for this day
    let dayNumber = clickedDayNode.innerText
    displayMeetingsForDay(dayNumber)
}

const createDays = function() {
    // TODO get the days for the current month
    // Assumption: use 31 days always, in this first release
    let numberOfDays = 31

    // 1) Let's get the days container div
    let daysContainerNode = document.getElementById('days-container')

    // 2) For loop 31 times
    for (let dayNumber = 1; dayNumber <= numberOfDays; dayNumber++) {
        // In each iteration of the for loop
        // 1) create the div
        let dayDivNode = document.createElement('div')

        // 2) we customize it --> add the .day class
        dayDivNode.innerText = dayNumber
        dayDivNode.classList.add("day")

        dayDivNode.onclick = selectDay // Just the name of the function, do not call it
        // To pass parameters to the selectDay function, we would need a lambda function
        // It will be a topic for the next modules

        // dayDivNode.addEventListener("click", selectDay) // Alternative to the line above

        // 3) attach it to the DOM
        daysContainerNode.appendChild(dayDivNode)

        // 4) we initialize the corresponding empty array of meetings in the data structure
        calendar[dayNumber] = [] // At the beginning, every day will have zero meetings, empty array
    }
}

const addMeeting = function() {

    // 1) We get the day we selected
    let selectedDay = document.querySelector(".selected")
    if(selectedDay === null) {
        // We did not select a day, so we just tell the user and exit the function
        alert("Please, select a day where to add the meeting!")
        return
    }

    let dayNumberAsString = selectedDay.innerText

    // 2) We get the array of meetings for the day, from the calendar object
    let meetingsForTheDay = calendar[dayNumberAsString]

    // 3) We get the values and put them inside a new meeting object
    let timeInputNode = document.getElementById("appointment-time")

    let descriptionInputNode = document.getElementById("appointment-description")

    let newMeeting = {
        time:  timeInputNode.value,
        description: descriptionInputNode.value
    }

    // 4) We add it to the meetings for the day
    meetingsForTheDay.push(newMeeting)

    // 5) We re-display the meetings for the day, so that we see also the new one
    displayMeetingsForDay(dayNumberAsString)
}