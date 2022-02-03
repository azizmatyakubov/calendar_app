window.onload = () => {
    day()
}

const day = () => {

    let calendar = document.getElementById('calendar')
    console.log(calendar)
    for(let i=1; i<=28; i++) {
        let day = document.createElement('div')
        day.classList.add('day')
        day.innerText = i
        calendar.appendChild(day)
    }


}

