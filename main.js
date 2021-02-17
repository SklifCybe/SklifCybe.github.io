'use strict';

const beginWork = new Date(2020, 6, 1);
const endWork = new Date(2022, 6, 1);

const container = document.getElementById('container');
const blockTimer = document.getElementById('timer');

(function optimizeForPhone() {
    if (window.screen.width <= 482) {
        container.style.width = '300px';
        blockTimer.style.width = '300px';
    } else {
        return;
    }
})();

function getCountRange(begin, end) {
    let delta = Math.abs(end - begin) / 1000;
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    let seconds = Math.floor(delta % 60); 
    
    return {
        days,
        hours,
        minutes,
        seconds
    };
}

function isZero(...args) {
    for (let el of args) {
        if (el != 0) {
            return false;
        }
    }
    return true;
}

function congratulation() {
    container.remove();
    let happy = document.createElement('div');
    happy.textContent = 'Мои поздравления. Неужели ты выжел?';
    happy.classList.add('congratulation');
    document.body.append(happy);
}

function startTimer() {
    setTimeout(function start() {
        let range = getCountRange(Date.now(), endWork);
        let {days, hours, minutes: min, seconds: sec} = range;
        blockTimer.textContent = `Дней ${days} 
                                Часов ${hours} 
                                Минут ${min} 
                                Секунд ${sec}`;
        if (isZero(days, hours, min, sec)) {
            congratulation();
        }
        setTimeout(start, 1000);
    }, 0);
}

startTimer();   






