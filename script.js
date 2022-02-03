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
        day.addEventListener('click', clickDay)
        calendar.appendChild(day)
    }


}


const clickDay = (e) => {
    if(document.querySelector('.selected') !== null) {
        document.querySelector('.selected').classList.remove('selected')
    }
    e.target.classList.add('selected')
}
