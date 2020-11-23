const classNames = {
    cell: 'cell',
    cellContent: 'cell-content',
    populated: 'populated',
    winner: 'winner',
};

const user = {
    x: 'X',
    o: 'O'
};

const winnerType = {
    tie: 'tie'
}

const winningMatrix = {
    0: [[1,2], [3,6], [4,8]],
    1: [[0,2], [4,7]],
    2: [[0,1], [5,8], [4,6]],
    3: [[0,6], [4,5]],
    4: [[3,5], [1,7], [0,8]],
    5: [[3,4], [2,8]],
    6: [[7,8], [0,3], [2,4]],
    7: [[6,8], [1,4]],
    8: [[6,7], [2,5], [0,4]]
}

let cellValues = ['', '', '', '', '', '', '', '', '']

let xNext = true;

let winningUser;

let numberOff = 9;

let winningCombination = [];

const cells = document.querySelectorAll(`.${classNames.cell}`);

const modal = document.querySelector('.modal');

const winnerDetails = document.querySelector('.winner-container > span');

const newGameButton = document.querySelector('.new-game-button')

const winCal = (matrix) => {
    const win = winningMatrix[matrix];

    for(let i = 0; i < win.length; i += 1) {
        const currentEntry = cellValues[matrix];
        const firstOption = cellValues[win[i][0]];
        const secondOption = cellValues[win[i][1]];

        if(currentEntry === firstOption && firstOption === secondOption) {
            winningUser = currentEntry;
            winningCombination = [matrix, win[i][0], win[i][1]];
            return true;
        }
    }

    if(numberOff === 0) {
        winningUser = winnerType.tie;
        winningCombination = [];
        return true;
    }

    return false;
}

let showModal = () => {
    if (winningUser === winnerType.tie) {
        winnerDetails.innerHTML = `Döntetlen!`;
    } else {
        winnerDetails.innerHTML = `${winningUser} győzött!`;
    }
    modal.style.display = 'flex';
};

const highlightWinningCells = () => {
    cells[winningCombination[0]].classList.add(classNames.winner);
    cells[winningCombination[1]].classList.add(classNames.winner);
    cells[winningCombination[2]].classList.add(classNames.winner);
}

const startGame = () => {
    cellValues = ['', '', '', '', '', '', '', '', '']

    xNext = true;

    winningUser = undefined;

    numberOff = 9;

    winningCombination = [];

    cells.forEach ((e, i) => {
        const cellContent = e.querySelector(`.${classNames.cellContent}`);
        cellContent.innerHTML = cellValues[i];
        cellContent.classList.remove(classNames.populated);
        e.classList.remove(classNames.winner);
    });

    modal.style.display = 'none';
}

newGameButton.addEventListener('click', () => {
     startGame();
})

cells.forEach((e, i) => {
    e.addEventListener('click', () => {
        if (!cellValues[i]) {
            cellValues[i] = xNext ? user.x : user.o;
            xNext = !xNext;
            numberOff--;

            if (winCal(i)) {
                if(winningUser !== winnerType.tie) {
                    highlightWinningCells();
                }
                showModal();
            }

            const cellContent = e.querySelector(`.${classNames.cellContent}`);
            cellContent.innerHTML = cellValues[i]; 
            cellContent.classList.add(classNames.populated);
        }
    })
})
