const keys = [...
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
];
var points = 0;
var lives = 3;
const timestamps = [];
var audioclc = new Audio('./assets/audio/click.mp3');
var audiowrong = new Audio('./assets/audio/wrong.mp3');
var audioand = new Audio('./assets/audio/end.mp3');
var start = 0;
timestamps.unshift(getTimestamp());
var heats = document.getElementById('hearts').children;
var color = "";
var akey = document.getElementById(getRandomKey());

function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKey() {
    let output = keys[getRandomNumber(0, keys.length - 1)];
    output = akey && (output == akey.innerHTML) ? getRandomKey() : output;
    //alert(akey ? akey.innerHTML : 0)
    return output;
}
var coun = setInterval(atimer, 100) //10 will  run it every 100th of a second

function targetRandomKey() {
    akey = document.getElementById(getRandomKey());
    akey.classList.add("selected");
    start = Date.now();
}

function atimer() {
    if (start == 0 || lives == 0) {
        clearInterval(coun);
        return;
    } else if (start + 4000 < Date.now()) {
        //alert('fuck');
        document.getElementsByClassName("selected")[0].classList.add("xpld");
        timestamps.unshift(getTimestamp());
        document.getElementsByClassName("selected")[0].style.color = null;
        document.getElementsByClassName("selected")[0].classList.remove("selected");
        targetRandomKey();
        //points ? points-- : points;

        document.getElementById('points').innerHTML = points;

        lives--;
        audiowrong.play();

        clearInterval(coun);
        coun = setInterval(atimer, 100);
        heatsmanager();
        return;

    } else if (start + 2100 < Date.now()) {
        document.getElementsByClassName("selected")[0].style.color = "black";
    } else {
        const thecolor = document.getElementsByClassName("selected")[0].classList[0];
        color = window.getComputedStyle(document.querySelector('.' + thecolor)).borderColor;
        document.getElementsByClassName("selected")[0].style.color = color;
    }
    //console.log(Date.now());
}

function getTimestamp() {
    return Math.floor(Date.now() / 1000)
}

document.addEventListener("keydown", event => {
    const keyPressed = String.fromCharCode(event.keyCode);
    const keyElement = document.getElementById(keyPressed);
    const highlightedKey = document.querySelector(".selected");

    keyElement.classList.add("hit")
    keyElement.addEventListener('animationend', () => {
        keyElement.classList.remove("hit")
    })

    if (keyPressed === highlightedKey.innerHTML) {
        document.getElementsByClassName("selected")[0].style.color = 'black';
        coun = setInterval(atimer, 100);
        timestamps.unshift(getTimestamp());
        const elapsedTime = timestamps[0] - timestamps[1];
        console.log(`Character per minute ${60/elapsedTime}`)
        highlightedKey.classList.remove("selected");
        points += getpoints();
        targetRandomKey();
        audioclc.play();

    } else {
        lives--;
        heatsmanager();
        audiowrong.play();
    }
    addPoints();
    // console.log(heats[2].setAttribute('name', 'heart'), lives)
    //remove.heats[2]

})

function getpoints() {

    return Math.abs(4000 - (Date.now() - start))
}

function addPoints() {

    document.getElementById('points').innerHTML = points;
}

function heatsmanager() {
    heats[0].setAttribute('name', lives >= 1 ? 'heart' : loseheart(heats[0]));
    heats[1].setAttribute('name', lives >= 2 ? 'heart' : loseheart(heats[1]));
    heats[2].setAttribute('name', lives >= 3 ? 'heart' : loseheart(heats[2]));
    checklose();
}

function checklose() {
    if (lives == 0) {
        clearInterval(counter);
        clearInterval(count);

        document.getElementById('playSec').classList.add('chrink');
        document.getElementById('game_over').classList.remove('hidden');
        document.getElementById('pausebtn').classList.add('chrink');

    }
}

function loseheart(v) {
    v.classList.add("hit")
    return 'heart-outline';
}

targetRandomKey();

var minute = 0;
var count = 0;
var counter = setInterval(timer, 10) //10 will  run it every 100th of a second
function timer() {
    document.getElementById('debug1').innerHTML = color;
    if (count >= 6000) {
        minute++;
        count = 0
    }
    count++;
    document.getElementById("timer").innerHTML = (+minute.toFixed(0)).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }) + ':' + (+(count / 100).toFixed(1)).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
}
// window.onload = function() {
//     var minute = 5;
//     var sec = 60;

//     setInterval(function() {

//         document.getElementById("timer").innerHTML =
//             minute + " : " + sec + " " + counter;
//         sec--;
//         if (sec == 00) {
//             minute--;
//             sec = 60;
//             if (minute == 0) {
//                 minute = 5;
//             }
//         }
//     }, 1000);
// };