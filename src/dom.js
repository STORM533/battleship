let controller;
let playerContainer;
let enemyContainer;
let statusDiv;

function isHit(board, x, y) {
    return board.ships.some(obj =>
        obj.positions.some(p => p[0] === x && p[1] === y)
    );
}

function wasAttacked(board, x, y) {
    return board.attackedCoords?.some(c => c[0] === x && c[1] === y);
}

function renderBoard(board, container, isEnemy = false) {
    container.innerHTML = '';

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.x = x;
            cell.dataset.y = y;

            // MISS
            if (board.missedAttacks.some(c => c[0] === x && c[1] === y)) {
                cell.classList.add('miss');
            }

            // HIT
            if (wasAttacked(board, x, y) && isHit(board, x, y)) {
                cell.classList.add('hit');
            }

            // SHOW PLAYER SHIPS ONLY
            if (!isEnemy && isHit(board, x, y)) {
                cell.classList.add('ship');
            }

            // CLICK (enemy only)
            if (isEnemy) {
                cell.onclick = () => handleAttack([x, y]);
            }

            container.appendChild(cell);
        }
    }
}

function init(gameController) {
    controller = gameController;

    playerContainer = document.querySelector('#player');
    enemyContainer = document.querySelector('#enemy');
    statusDiv = document.querySelector('#status');

    if (!playerContainer || !enemyContainer) {
        throw new Error('Missing DOM containers');
    }

    controller.randomizeShips();
    render();
}

function handleAttack(coords) {
    controller.playerAttack(coords);

    if (!controller.isGameOver()) {
        controller.computerAttack();
    } else {
        statusDiv.textContent = "Game Over";
    }

    render();
}

function render() {
    renderBoard(controller.player.gameboard, playerContainer);
    renderBoard(controller.computer.gameboard, enemyContainer, true);
}
document.querySelector('#randomBtn').onclick = () => {
    controller.randomizeShips();
    render();
};

document.querySelector('#startBtn').onclick = () => {
    statusDiv.textContent = "Game Started!";
};

document.querySelector('#resetBtn').onclick = () => {
    location.reload();
};
export { init };