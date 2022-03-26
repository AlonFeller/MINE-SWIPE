'use strict'



function buildBoard(size) {
    const SIZE = size;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var Cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
            board[i][j] = Cell;
        }
    }
    return board;
}

function printMat(mat) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j]
            var className = 'cell cell-' + i + '-' + j;
            strHTML += `<td class=" ${className} " oncontextmenu="flagged(this, ${i}, ${j})" onclick="cellClicked(this, ${i}, ${j})"}</td>`;
        }
        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector('.gameboard');
    elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    if (!gBoard[location.i][location.j].isShown) {
        gBoard[location.i][location.j].isShown = true;
        elCell.innerHTML = value;
        elCell.style.backgroundImage = 'linear-gradient(grey,lightgray)';
    }
}

function renderShownCell(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    if (gBoard[location.i][location.j].isShown) {
        gBoard[location.i][location.j].isShown = false;
        elCell.innerHTML = '';
        elCell.style.backgroundImage = 'linear-gradient(lightgray,grey)';
    }
}

function getRandomInt(min, max) {
    var newNumber = Math.floor(Math.random() * (max - min) + min);
    return newNumber;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
    let R = Math.floor(Math.random() * 255);
    let G = Math.floor(Math.random() * 255);
    let B = Math.floor(Math.random() * 255);
    let rgb1 = 'rgba(' + R + ',' + B + ',' + G + ',' + '0.2' + ')';
    return rgb1;
}

function renderTime() {
    sMilSec = 0;
    gSec = 0;
    gMin = 0;
    gStopper = setInterval(timer, 1);
}

function timer() {
    gGames.secPassed++;
    var secStr;
    var minStr;
    if (gGames.secPassed === 60) {
        gGames.secPassed = 0;
        gGames.minPassed++;
    }
    secStr = gGames.secPassed;
    minStr = gGames.minPassed;
    if (gGames.secPassed < 10) {
        secStr = `0${gGames.secPassed}`;
    }
    if (gGames.minPassed < 10) {
        minStr = `0${gGames.minPassed}`;
    }

    var strHTML = `${minStr}:${secStr}`;
    gElTimer.innerHTML = strHTML;
}