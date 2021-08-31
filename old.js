const startBtn = document.querySelector('#start'),
    screens = document.querySelectorAll('.screen'),
    timeList = document.querySelector('#time-list'),
    timeEl = document.querySelector('#time'),
    board = document.querySelector('#board'),
    nextBtn = document.querySelector('#nextBtn')
let time = 10

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }else if (event.target.classList.contains('board')){
        finishGame()
    }
})

function startGame() {
    score = 0
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
    nextBtn.classList.add('hide')
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    }else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }

}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

