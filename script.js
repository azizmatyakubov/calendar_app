// calendar database
let calendar = {
    '1': [{'description': 'Call Eric'}]}


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

    calendar[dayOfTheMonth] = []

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

    let todos = document.getElementsByClassName('todos')
    todos.innerText = ''

    for(let meeting of meetingsListForToday) {
        let h3ForList = document.createElement('h3')
        h3ForList.classList.add('todos-title')
        h3ForList.innerText = meeting.description
        todos.appendChild(h3ForList)
    }
}