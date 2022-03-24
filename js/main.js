'use strict'


var gBoard = [];
var Cell = {
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    isMarked: false
};
var gLevels = [{ size: 4, mines: 3 }, { size: 10, mines: 15 }, { size: 16, mines: 35 }];
var gCurrLvl = 0;
var gGames = {
    isOn: false,
    // isLifeModeOn: false,
    // lifeCount: 3,
    shownCount: 0,
    markedCount: 0,
    score: 0,
    secPassed: 0,
    minPassed: 0
};
var gIsFirstMove = true;
var gIsTimerOn = false;
var TimerInterval;
var textColorInterval;
var bodyColorInterval;
var gMines = [];
const MINE = '💣';
const FLAG = '🚩';
var gElEasyBtn = document.querySelector('.easy');
var gElNormalBtn = document.querySelector('.normal');
var gElHardBtn = document.querySelector('.hard');
var gElTimer = document.querySelector('.timer');
var gElScore = document.querySelector('.score');
var gElMineCounter = document.querySelector('.minesLeft');
var gElBtn = document.querySelector('.restartbutton');
const noContext = document.getElementById('noContextMenu');
noContext.addEventListener('contextmenu', e => {
    e.preventDefault();
});

function initGame(i) {
    renderBtns(i);
    resetGame(i)
    if (i || i === 0) { gCurrLvl = i }
    // console.log(i);
    // console.log(gLevels[gCurrLvl].size);
    gBoard = buildBoard(gLevels[gCurrLvl].size);
    generateMines(gLevels[gCurrLvl].mines);
    setMinesNegsCount(gBoard);
    printMat(gBoard);
    var elBody = document.querySelector('body');
    bodyColorInterval = setInterval(function() {
            elBody.style.backgroundColor = `${getRandomColor()}`
        }, 2000)
        // console.table(gMines);
}