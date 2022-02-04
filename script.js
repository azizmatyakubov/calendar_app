// calendar database
let calendar = {

}


window.onload = () => {
    createDays()
}

const createDays = () => {

    // Get node of calendar div
    let calendarDiv = document.getElementById('calendar')

    // Total days
    let totalDays = 28

    for(let dayOfTheMonth=1; dayOfTheMonth<=totalDays; dayOfTheMonth++) {
        
        // set dafault array to every day
        calendar[dayOfTheMonth] = []
        
        // Create new div
        let dayDiv = document.createElement('div')
        
        // Add class to new div
        dayDiv.classList.add('day')

        // Add innerText to new div ----> dayOfTheMonth from loop
        dayDiv.innerText = dayOfTheMonth

        // Add event listener to new div
        dayDiv.addEventListener('click', clickDay)

        // Append child to calendar div
        calendarDiv.appendChild(dayDiv)
        
    }
}


const clickDay = (e) => {

    let currentlySelectedDayNode =  document.querySelector('.selected')

    if(currentlySelectedDayNode !== null) {
        currentlySelectedDayNode.classList.remove('selected')
    }
    e.target.classList.add('selected')

    let selectedDaysNumber = e.target.innerText
    displayMeetingsForDay(selectedDaysNumber)
}

const displayMeetingsForDay = (selectedDaysNumber) => {
    
    meetingsListForToday = calendar[selectedDaysNumber]
    console.log(meetingsListForToday)

    // Remove innerText of todos div
    let appointments = document.getElementsByClassName('appointments')[0]
    appointments.innerText = ''
    console.log(appointments)

    // Looping each element of selected days array
    for(let meeting of meetingsListForToday) {

        // Create Nodes
        let h3ForList = document.createElement('h3')
        let divForList = document.createElement('div')
        let divForTodos = document.createElement('div')
        // Add Classes
        h3ForList.classList.add('todos-title')
        divForList.classList.add('todos-time')
        divForTodos.classList.add('todos')

        // Add innerText
        h3ForList.innerText = meeting['title']
        divForList.innerText = meeting['time']
      
        // Append children to todos div
        divForTodos.appendChild(h3ForList)
        divForTodos.appendChild(divForList)
  
        // Append to todos div
        appointments.appendChild(divForTodos)
    }
}

const addMeeting = () => {


    // Get node which has selected class
    let selectedDay = document.querySelector('.selected')

    if(selectedDay === null) {
        alert("Select day!")
        return
    }

    // Get innerText of selectedDay
    let selectedDayAsString = selectedDay.innerText

    // Get selectedDays array
    let meetingsForSelectedDay = calendar[selectedDayAsString]
    
    // Get values from user
    let appointmentTitle = document.getElementById('appointment-title').value
    let appointmentTime = document.getElementById('appointment-time').value

    // Create new object
    let newTodos = {
        'title': appointmentTitle,
        'time': appointmentTime, 
    }

    // Push object to array
    meetingsForSelectedDay.push(newTodos)

    displayMeetingsForDay(selectedDayAsString)
}