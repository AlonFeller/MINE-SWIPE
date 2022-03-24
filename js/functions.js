'use strict'



function generateMines(numberOfMines) {
    for (var i = 0; i < numberOfMines; i++) {
        generateMine()
    }
}

function generateMine() {
    var indexI = getRandomIntInclusive(0, gBoard.length - 1);
    var indexJ = getRandomIntInclusive(0, gBoard.length - 1);
    var isCellMine = gBoard[indexI][indexJ].isMine;
    if (!isCellMine) {
        gBoard[indexI][indexJ].isMine = true;
        gMines.push(gBoard[indexI][indexJ]);
    } else generateMine()
}

function setMinesNegsCount(gBoard) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) continue;
            var count = countMines(i, j)
            gBoard[i][j].minesAroundCount = count;
        }
    }
}

function countMines(indexI, indexJ) {
    var count = 0;
    for (var i = indexI - 1; i <= indexI + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = indexJ - 1; j <= indexJ + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue
            if (i === indexI && j === indexJ) continue
            if (gBoard[i][j].isMine) count++;
        }
    }
    return count;
}

function showMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMine) renderCell({ i, j }, MINE);
        }
    }
    gElBtn.innerHTML = '😵';
}

function showEmptyNeighbors(indexI, indexJ) {
    for (var i = indexI - 1; i <= indexI + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;
        for (var j = indexJ - 1; j <= indexJ + 1; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue;
            if (gBoard[i][j].isShown) continue;
            if (i === indexI && j === indexJ) continue;
            if (gBoard[i][j].isMine) continue;
            if (gBoard[i][j].minesAroundCount === 0) {
                if (gBoard[i][j].isMarked) {
                    gBoard[i][j].isMarked = false;
                    gGames.markedCount--;
                }
                renderCell({ i, j }, ' ');
                gGames.score++;
                gElScore.innerHTML = gGames.score;
                showEmptyNeighbors(i, j);
            }
            if (gBoard[i][j].minesAroundCount > 0 && !gBoard[i][j].isMine) {
                renderCell({ i, j }, gBoard[i][j].minesAroundCount);
                if (gBoard[i][j].isMarked) {
                    gBoard[i][j].isMarked = false;
                    gGames.markedCount--;
                    console.log(gGames.markedCount);
                }
            }
        }
    }
}

function cellClicked(elCell, i, j) {
    if (gGames.isOn) {
        if (!gIsTimerOn) {
            TimerInterval = setInterval(timer, 1000);
            gIsTimerOn = true;
        }
        if (gBoard[i][j].isMine) {
            gGames.isOn = false;
            showMines();
            clearInterval(TimerInterval);
            checkGameOver();
        } else if (gBoard[i][j].minesAroundCount === 0) {
            renderCell({ i, j }, ' ');
            gGames.score++;
            gElScore.innerHTML = gGames.score;
            showEmptyNeighbors(i, j);
        } else if (gBoard[i][j].minesAroundCount > 0) {
            renderCell({ i, j }, gBoard[i][j].minesAroundCount);
            gGames.score++;
            gElScore.innerHTML = gGames.score;
        }
        checkGameOver()
        gElMineCounter.innerHTML = gLevels[gCurrLvl].mines - gGames.markedCount;
    }
}


function checkGameOver() {
    var isOver = false;
    for (var i = 0; i < gLevels[gCurrLvl].mines; i++) {
        isOver = (gMines[i].isMarked && gMines[i].isMarked);
        // console.log(isOver);
        if (!isOver) return;
    }
    gGames.isOn = false;
    clearInterval(TimerInterval);
    showAll();
    gGames.score += gLevels[gCurrLvl].mines * 15;
    gElScore.innerHTML = gGames.score;
    var elWin = document.querySelector('.victory');
    elWin.style.display = 'block';
    gElBtn.innerHTML = '😎';
    textColorInterval = setInterval(function() {
        elWin.style.color = `${getRandomColor()}`
    }, 500)
}

function flagged(elCell, i, j) {
    if (gGames.isOn) {
        if (!gIsTimerOn && gGames.isOn) {
            TimerInterval = setInterval(timer(), 1000)
            gIsTimerOn = true;
            console.log(TimerInterval);
        }
        if (!gBoard[i][j].isMarked) {
            elCell.innerHTML = FLAG;
            elCell.style.backgroundImage = 'linear-gradient(grey,lightgray)';
            gBoard[i][j].isMarked = true;
            gGames.markedCount++;
        } else {
            elCell.innerHTML = ' ';
            elCell.style.backgroundImage = 'linear-gradient(lightgray, grey)';
            gBoard[i][j].isMarked = false;
            gGames.markedCount--;
        }
        gElMineCounter.innerHTML = gLevels[gCurrLvl].mines - gGames.markedCount;
        checkGameOver()
    }
}

function showAll() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (!gBoard[i][j].isShown) {
                if (gBoard[i][j].minesAroundCount > 0) renderCell({ i, j }, gBoard[i][j].minesAroundCount);
                if (gBoard[i][j].minesAroundCount === 0) renderCell({ i, j }, ' ')
                if (gBoard[i][j].isMine) renderCell({ i, j }, MINE);
            }
        }
    }
}

function resetGame(i) {
    gIsTimerOn = false;
    gGames.isOn = true;
    gGames.score = 0;
    gGames.secPassed = 0;
    gGames.minPassed = 0;
    gMines = [];
    gElBtn.innerHTML = `🙂`;
    console.clear();
    clearInterval(textColorInterval);
    clearInterval(TimerInterval)
    gElTimer.innerHTML = '';
    gElScore.innerHTML = '';
    gElMineCounter.innerHTML = '';
    gGames.markedCount = 0;
}
// function cellMarked(elCell) {