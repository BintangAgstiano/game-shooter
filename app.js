const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
let canvasWidth = canvas.width = 1000
let canvasHeight = canvas.height = 600
let scoreSpan = document.querySelector('.score')
let xGun = 200
let timerStart = document.querySelector('.timer-start')
let indexTimerStart = 3
let arrTarget = []
let username = document.querySelector('.username')
let inputRadio = document.querySelectorAll('.input-radio')
let inputRadioTarget = document.querySelectorAll('.input-radio-target')
let yPointer = 0
const inputUsername = document.querySelector('.input-username')
const halamanDepan = document.querySelector('.halaman-depan')
const inputLevel = document.querySelector('#input-level')
const btnPlay = document.querySelector('.btn-play')
let intervalTarget
let timer = document.querySelector('.timer')
let intervalStart
let timeLevel 
let menit = 0
let detik = 0
function updateBtnColor() {
    if (inputLevel.value !== '' && inputUsername.value !== '') {
        btnPlay.style.backgroundColor = 'red'
        btnPlay.style.cursor = 'pointer'
        btnPlay.disabled = false
        // username = inputUsername.value

        btnPlay.addEventListener('click', function () {
            halamanDepan.style.display = 'none'
            username.innerHTML = inputUsername.value
            handleIntervalStart()
            if(inputLevel.value=='level 1'){
timeLevel=10
}else if(inputLevel.value=='level 2'){
timeLevel=20
}else if(inputLevel.value=='level 3'){
timeLevel=30
}
detik=timeLevel
        })
    } else {
        btnPlay.style.backgroundColor = 'gray'
        btnPlay.disabled = true
        btnPlay.style.cursor = 'not-allowed'
    }
}

inputUsername.addEventListener('input', updateBtnColor)
inputLevel.addEventListener('change', updateBtnColor)

updateBtnColor()

let countdownSelesai = false;
let historyElement = document.querySelector('.col-history')
let interval
let btnSort = document.querySelector('.btn-sort')
let statusFilter = false
btnSort.addEventListener('click', function () {
    let gameData = JSON.parse(localStorage.getItem('gameData') || "[]");


    gameData.sort((a, b) => {
        return !statusFilter ? a.score - b.score : b.score - a.score;
    });
    statusFilter = !statusFilter


    localStorage.setItem('gameData', JSON.stringify(gameData));
    handleForeach()

});



function handleForeach() {
    let gameData = JSON.parse(localStorage.getItem('gameData') || "[]");

    historyElement.innerHTML = '';
    gameData.forEach((gameData, index) => {

        historyElement.innerHTML += `<div class="history">
    <div class="left-history">
       <div>${gameData.username}</div>
       <div>Score: ${gameData.score}</div>
    </div>
    <div class="right-history">
       <button class="btn-hapus" data-index="${index}">Hapus</button>
    </div>
    </div>`
    })
    const btnHapus = document.querySelectorAll('.btn-hapus')
    btnHapus.forEach(button => {
        button.addEventListener('click', function (e) {
            let index = e.target.dataset.index
            alert(index)
            gameData.splice(index, 1)
            localStorage.setItem('gameData', JSON.stringify(gameData));
            handleForeach();
        })
    })
}
handleForeach()


function startInterval() {

    if (menit < 10) {
        menit = '0' + menit
    }
    interval = setInterval(() => {
        detik--
        if (detik < 10) {
            var timerJs = `${menit} : 0${detik}`
        } else {
            var timerJs = `${menit} : ${detik}`
        }
        timer.innerHTML = timerJs
        if (detik == 0) {
            clearInterval(interval)
            let newGameData = {
                score: totalScore,
                username: username.innerHTML
            };
            let gameData = JSON.parse(localStorage.getItem('gameData'))
            if (!Array.isArray(gameData)) {
                gameData = [];
            }


            gameData.push(newGameData);

            localStorage.setItem('gameData', JSON.stringify(gameData));

            gameOver()
        }
    }, 1000);
}
function gameOver() {
    alert('Game Over');

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    totalScore = 0
    scoreSpan.innerHTML = 0
    arrTarget = []
    menit = 0
    detik = timeLevel
    clearInterval(interval);
    indexTimerStart = 4
    countdownSelesai = false
    clearInterval(intervalTarget)
    clearInterval(intervalStart)
    handleForeach()

    handleIntervalStart()



}
let gunImage = new Image();
inputRadio.forEach(radio => {
    radio.addEventListener('change', function () {
        if (radio.checked) {
            gunImage.src = radio.value;
            gunImage.onload = function () {
                drawGun()
            }
        }
    })
})
let pointer = new Image()
pointer.src = 'pointer.png'
pointer.onload = function () {
    drawPointer()
}


let xPosition
let yPosition
let totalScore = 0
let boom = new Image()
boom.src = 'boom.png'
boom.onload = function () {
    drawBoom()
}
let target = new Image()
inputRadioTarget.forEach(radioTarget => {
    radioTarget.addEventListener('change', function () {

        target.src = radioTarget.value
        target.onload = function () {
            drawTarget()
        }
    })
})

function drawTarget() {
    arrTarget.forEach(t => {
        ctx.drawImage(target, t.x, t.y, 150, 150)
    })

}
function drawBoom() {
    ctx.drawImage(boom, xGun, yPointer, 50, 50)

}

function drawPointer() {
    ctx.drawImage(pointer, xGun, yPointer, 50, 50)
}

function drawGun() {
    ctx.clearRect(0, 0, 1000, 600)
    ctx.drawImage(gunImage, xGun, canvasHeight - 200, 200, 200);

}

function run() {
    startInterval()
    canvas.addEventListener('mousemove', function (e) {
        xPosition = e.clientX - canvas.getBoundingClientRect().left
        yPosition = e.clientY - canvas.getBoundingClientRect().top
        if (xPosition < canvas.width - 200) {
            xGun = xPosition
        } else {
            xGun = canvas.width - 200
        }
        if (yPosition < canvasHeight - 300) {
            yPointer = yPosition

        }
        drawGun()
        drawTarget()
        drawPointer()

    });
    canvas.addEventListener('click', function () {

        let lengthOld = arrTarget.length
        drawBoom()
        arrTarget = arrTarget.filter(targetFilter => {
            if (xGun + 25 > targetFilter.x && xGun + 25 < targetFilter.x + 150 && yPointer + 25 > targetFilter.y && yPointer + 25 < targetFilter.y + 150) {

                return false
            }


            return true
        })
        let score = lengthOld - arrTarget.length
        totalScore += score
        console.log(totalScore);
        scoreSpan.innerHTML = totalScore

        setTimeout(() => {
            ctx.clearRect(0, 0, 1000, 600)
            drawGun()
            drawTarget()
            drawPointer()
        }, 300);
    })
    clearInterval(intervalTarget)
    intervalTarget = setInterval(() => {
        if (countdownSelesai) {

            let xRandom = Math.random() * (canvasWidth - 300)
            let yRandom = Math.random() * (canvasHeight - 400)
            arrTarget.push({ x: xRandom, y: yRandom })
            drawBoom()
            drawGun()
            drawPointer()
            drawTarget()
        }
    }, 3000);
}

function handleIntervalStart() {
    clearInterval(intervalStart)
    intervalStart = setInterval(() => {
        if (indexTimerStart > 0) {
            indexTimerStart -= 1
            timerStart.innerHTML = indexTimerStart
        }
        if (indexTimerStart == 0) {
            clearInterval(intervalStart)
            countdownSelesai = true
            run()
            timerStart.innerHTML = ''
        }
    }, 1000);
}





const btnInstruction = document.querySelector('.btn-instruction');
const colInstruksi = document.querySelector('.col-instruksi');
const btnClose = document.querySelector('.btn-close');
btnInstruction.addEventListener('click', function () {
    colInstruksi.classList.add('active')
    btnClose.classList.add('active')
})
btnClose.addEventListener('click', function () {
    const colInstruksiActive = document.querySelector('.col-instruksi.active');
    const btnCloseActive = document.querySelector('.btn-close.active');

    if (colInstruksiActive) {
        colInstruksiActive.classList.remove('active')
        btnCloseActive.classList.remove('active')
    }

})