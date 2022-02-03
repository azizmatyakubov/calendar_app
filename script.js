// calendar database
let calendar = {
    '1': [{'description': 'Call Eric', 'time': '19:30'},{'description': 'Call Eric', 'time': '19:30'}, {'description': 'Call Eric', 'time': '19:30'}]}


window.onload = () => {
    createDays()
}

const createDays = () => {

    let calendarDiv = document.getElementById('calendar')
    let totalDays = 28

    for(let dayOfTheMonth=1; dayOfTheMonth<=totalDays; dayOfTheMonth++) {
        let dayDiv = document.createElement('div')
        dayDiv.classList.add('day')
        dayDiv.innerText = dayOfTheMonth
        dayDiv.addEventListener('click', clickDay)
        calendarDiv.appendChild(dayDiv)
    }

    //calendar[dayOfTheMonth] = []

}


const clickDay = (e) => {
    if(document.querySelector('.selected') !== null) {
        document.querySelector('.selected').classList.remove('selected')
    }
    e.target.classList.add('selected')

    let selectedDaysNumber = e.target.innerText
    displayMeetingsForDay(selectedDaysNumber)
}


const displayMeetingsForDay = (selectedDaysNumber) => {
    
    let meetingsListForToday = calendar[selectedDaysNumber]

    // Remove innerText of todos div
    let appointments = document.getElementsByClassName('appointments')[0]
    appointments.innerText = ''

    // Looping each element of selected days array
    for(let i=0; i<meetingsListForToday.length; i++) {

        // Create Nodes
        let h3ForList = document.createElement('h3')
        let divForList = document.createElement('div')
        let divForTodos = document.createElement('div')
        // Add Classes
        h3ForList.classList.add('todos-title')
        divForList.classList.add('todos-time')
        divForTodos.classList.add('todos')

        // Add innerText
        h3ForList.innerText = meetingsListForToday[i]['description']
        divForList.innerText =  meetingsListForToday[i]['time']
      
        // Append children to todos div
        divForTodos.appendChild(h3ForList)
        divForTodos.appendChild(divForList)
        console.log(divForTodos)

        // Append to todos div
        appointments.appendChild(divForTodos)
    }
}