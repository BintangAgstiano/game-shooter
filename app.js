const canvas = document.querySelector('canvas');
const wCanvas = canvas.width = 1000;
const hCanvas = canvas.height = 650;
const ctx = canvas.getContext('2d');
const score = document.querySelector('.score');
let scoreVar = 0
score.innerHTML = scoreVar;
let xCursor = 0
let yCursor = 0
let timer = document.querySelector('.timer');
let nameGameOver = document.querySelector('.name-gameover');
let scoreGameOver = document.querySelector('.score-gameover');
let popupGameOver = document.querySelector('.popup-gameover');
let popupScreen = document.querySelector('.popup-screen');
let btnRestart = document.querySelector('.btn-restart');
let inputName = document.querySelector('.input-name');
let btnPlay = document.querySelector('.btn-play');
let selectLevel = document.querySelector('.select-level');
let radioGun = document.querySelectorAll('.radio-gun');
let radioTarget = document.querySelectorAll('.radio-target');
let username = document.querySelector('.username');
let popupTimer = document.querySelector('.popup-timer');
let colTimer = document.querySelector('.col-timer');
let popupPause = document.querySelector('.popup-pause');
let continuePause = document.querySelector('.btn-continue-pause');
let restartPause = document.querySelector('.btn-restart-pause');
let contentLeadeboard = document.querySelector('.content-leadebord');
let btnSave = document.querySelector('.btn-save');
let btnSosrt = document.querySelector('.btn-sort');
let btnInstruction = document.querySelector('.btn-instruction');
let btnClose = document.querySelector('.box-close');
let popupInstruction = document.querySelector('.popup-instruksi');
let arrTarget = [];

for (let i = 0; i < 3; i++) {
    let xRand = Math.floor(20 + Math.random() * (wCanvas - 250));
    let yRand = Math.floor(20 + Math.random() * (hCanvas - 410))
    arrTarget.push({ x: xRand, y: yRand });

}
btnInstruction.addEventListener('click', function () {
    popupInstruction.style.display = 'flex'
})
btnClose.addEventListener('click', function () {
    popupInstruction.style.display = 'none'
})
let intervalTarget
btnSosrt.addEventListener('click', function () {
    let data = JSON.parse(localStorage.getItem('gameData')) || [];
    data.sort((a, b) => { return b.score - a.score })
    localStorage.setItem('gameData', JSON.stringify(data));
    let gameDataVar = JSON.parse(localStorage.getItem('gameData')) || []
    contentLeadeboard.innerHTML = ''
    gameDataVar.forEach(element => {
        contentLeadeboard.innerHTML += ` <div class="box-leadeboard">
                        <div class="left">
                            <div>${element.username}</div>
                            <div>Score : ${element.score}</div>
                        </div>
                        <div class="right">
                            <button class="detail">Detail</button>
                        </div>
                    </div>`
    });
})
let detik;
// timer.innerHTML = `00:${detik.toString().padStart(2, '0')}`

function startIntervalTarget() {
    intervalTarget = setInterval(() => {
        let xRand = Math.floor(20 + Math.random() * (wCanvas - 250));
        let yRand = Math.floor(20 + Math.random() * (hCanvas - 410))
        arrTarget.push({ x: xRand, y: yRand });
    }, 3000);
}
inputName.value = ''
let isName = false
inputName.addEventListener('input', function () {
    if (inputName.value === '') {
        isName = false
    } else {
        username.innerHTML = inputName.value;

        isName = true

    }
})
selectLevel.value = '30'

btnPlay.addEventListener('click', function () {
    if (isName) {
        popupScreen.style.display = 'none'
        let levelValue = selectLevel.value
        detik = levelValue
        timer.innerHTML = `00:${detik.toString().padStart(2, '0')}`

        popupTimer.style.display = 'flex'
        let intervalTimer2
        let detikVar = 3
        colTimer.innerHTML = detikVar
        intervalTimer2 = setInterval(() => {
            detikVar -= 1
            colTimer.innerHTML = detikVar
            if (detikVar < 1) {
                clearInterval(intervalTimer2)
                popupTimer.style.display = 'none'
                main();
            }
        }, 1000);

    }
})

const imageTarget = new Image();
radioTarget.forEach(radio => {
    radio.addEventListener('change', function () {
        if (radio.checked) {
            imageTarget.src = radio.value
        }
    })
})
imageTarget.onload = () => {
    drawTarget();
}



const imageGun = new Image();


radioGun.forEach(radio => {
    radio.addEventListener('change', function () {
        if (radio.checked) {
            imageGun.src = radio.value
        }
    })
})
imageGun.onload = () => {
    drawGun();
}

const imagePointer = new Image();
imagePointer.src = 'pointer.png'
imagePointer.onload = () => {
    drawPointer();
}
const imageBoom = new Image();
imageBoom.src = 'boom.png'
imageBoom.onload = () => {
    drawBoom();
}
btnSave.addEventListener('click', function () {
    let newData = { score: scoreVar, username: inputName.value }
    let getLs = JSON.parse(localStorage.getItem('gameData')) || [];
    getLs.push(newData);
    localStorage.setItem('gameData', JSON.stringify(getLs));

    let gameDataVar = JSON.parse(localStorage.getItem('gameData')) || []
    contentLeadeboard.innerHTML = ''
    gameDataVar.forEach(element => {
        contentLeadeboard.innerHTML += ` <div class="box-leadeboard">
                        <div class="left">
                            <div>${element.username}</div>
                            <div>Score : ${element.score}</div>
                        </div>
                        <div class="right">
                            <button class="detail">Detail</button>
                        </div>
                    </div>`
    });
})
function drawBoom() {
    ctx.drawImage(imageBoom, xCursor, yCursor, 50, 50);

}


function drawTarget() {
    arrTarget.forEach(target => {
        ctx.drawImage(imageTarget, target.x, target.y, 150, 150);
    })

}




function drawPointer() {
    ctx.drawImage(imagePointer, xCursor, yCursor,);

}

function drawGun() {
    if (xCursor > wCanvas - 210) {
        xCursor = wCanvas - 210
    }
    if (xCursor < 0) {
        xCursor = 0
    }
    ctx.drawImage(imageGun, xCursor, hCanvas - 210, 210, 210);
}
setInterval(() => {
    ctx.clearRect(0, 0, wCanvas, hCanvas);
    drawGun()
    drawTarget()
    drawPointer()
    if (isClick) {
        drawBoom()
    }
}, 10);
function moveMouse(e) {
    xCursor = e.clientX - canvas.getBoundingClientRect().left - 25;
    yCursor = e.clientY - canvas.getBoundingClientRect().top - 25;
}
let intervalTimer;
function startIntervalTimer() {
    intervalTimer = setInterval(() => {
        detik -= 1
        timer.innerHTML = `00:${detik.toString().padStart(2, '0')}`
        if (detik < 1) {
            detik = 0
            timer.innerHTML = `00:${detik.toString().padStart(2, '0')}`
            gameOver()
        }
    }, 1000);
}
btnRestart.addEventListener('click', function () {
    popupGameOver.style.display = 'none'
  
    scoreVar = 0
    score.innerHTML = 0
    


    arrTarget = [];
    timer.innerHTML = `00:${detik.toString().padStart(2, '0')}`
    for (let i = 0; i < 3; i++) {
        let xRand = Math.floor(20 + Math.random() * (wCanvas - 250));
        let yRand = Math.floor(20 + Math.random() * (hCanvas - 410))
        arrTarget.push({ x: xRand, y: yRand });

    }
    detik = selectLevel.value


    popupTimer.style.display = 'flex'
    let intervalTimer2
    let detikVar = 3
    colTimer.innerHTML = detikVar
    intervalTimer2 = setInterval(() => {
        detikVar -= 1
        colTimer.innerHTML = detikVar
        if (detikVar < 1) {
            clearInterval(intervalTimer2)
            popupTimer.style.display = 'none'
            startIntervalTarget()
            startIntervalTimer()
        }
    }, 1000);
});
restartPause.addEventListener('click', function () {
    popupPause.style.display = 'none'
    scoreVar = 0
    score.innerHTML = 0
    arrTarget = [];
    timer.innerHTML = `00:${detik.toString().padStart(2, '0')}`
    for (let i = 0; i < 3; i++) {
        let xRand = Math.floor(20 + Math.random() * (wCanvas - 250));
        let yRand = Math.floor(20 + Math.random() * (hCanvas - 410))
        arrTarget.push({ x: xRand, y: yRand });

    }
    detik = selectLevel.value


    popupTimer.style.display = 'flex'
    let intervalTimer2
    let detikVar = 3
    colTimer.innerHTML = detikVar
    intervalTimer2 = setInterval(() => {
        detikVar -= 1
        colTimer.innerHTML = detikVar
        if (detikVar < 1) {
            clearInterval(intervalTimer2)
            popupTimer.style.display = 'none'
            startIntervalTarget()
            startIntervalTimer()
        }
    }, 1000);

});
let isClick = false
function updateGame() {
    isClick = true;
    setTimeout(() => {
        isClick = false;
    }, 100);
    let oldLength = arrTarget.length;
    let targetHit = false;
    arrTarget.forEach((target, index) => {
        if (
            xCursor > target.x &&
            xCursor < target.x + 150 &&
            yCursor > target.y &&
            yCursor < target.y + 150
        ) {
            arrTarget.splice(index, 1);
            targetHit = true;
        }
    });


    if (!targetHit) {
        detik -= 5;
        if (detik < 0) detik = 0;
        timer.innerHTML = `00:${detik.toString().padStart(2, '0')}`;
        if (detik === 0) {
            gameOver();
        }
    }
    let scores = oldLength - arrTarget.length;
    scoreVar += scores
    score.innerHTML = scoreVar
}
function gameOver() {
    popupGameOver.style.display = 'flex'
    clearInterval(intervalTarget);
    clearInterval(intervalTimer);
    nameGameOver.innerHTML = username.innerHTML
    scoreGameOver.innerHTML = 'score : ' + scoreVar
}
function pause() {
    popupPause.style.display = 'flex'
    clearInterval(intervalTarget)
    clearInterval(intervalTimer)
}
let isAsc = false

continuePause.addEventListener('click', function () {
    popupPause.style.display = 'none'
    isAsc = false
    startIntervalTarget()
    startIntervalTimer()

})
let gameDataVar = JSON.parse(localStorage.getItem('gameData')) || []
contentLeadeboard.innerHTML = ''
gameDataVar.forEach(element => {
    contentLeadeboard.innerHTML += ` <div class="box-leadeboard">
                        <div class="left">
                            <div>${element.username}</div>
                            <div>Score : ${element.score}</div>
                        </div>
                        <div class="right">
                            <button class="detail">Detail</button>
                        </div>
                    </div>`
});
function main() {
    drawGun();
    drawTarget();
    drawPointer();
    startIntervalTarget()
    startIntervalTimer()
    if (isClick) {
        drawBoom()
    }
    document.addEventListener('keydown', function (e) {

        if (e.keyCode == 27) {
            if (isAsc == false) {
                isAsc = true
                pause()

            } else if (isAsc == true) {
                isAsc = false
                popupPause.style.display = 'none'
                startIntervalTarget()
                startIntervalTimer()
            }
        }

    })
    // function togle(){
    //     if(isAsc){
    //         pause
    //     }
    // }
    canvas.addEventListener('mousemove', moveMouse);
    canvas.addEventListener('click', updateGame);

}
// main();