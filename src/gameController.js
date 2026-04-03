// gameController.js
import{Player}from "./Player.js";
import{Ship}from "./Ship.js";
function GameController() {
    let player = Player('human');
    let computer = Player('computer');
    let currentTurn = 'player';
    let gameOver = false;

    function setupGame() {
        // predetermined ships
        player.gameboard.placeShip(Ship(2), [[0,0],[0,1]]);
        computer.gameboard.placeShip(Ship(2), [[1,0],[1,1]]);
    }

    function playerAttack(coords) {
        if (gameOver || currentTurn !== 'player') return;

        computer.gameboard.receiveAttack(coords);

        if (computer.gameboard.allShipsSunk()) {
            gameOver = true;
            return 'player wins';
        }

        currentTurn = 'computer';
    }

    function computerAttack() {
        if (gameOver || currentTurn !== 'computer') return;

        computer.randomAttack(player);

        if (player.gameboard.allShipsSunk()) {
            gameOver = true;
            return 'computer wins';
        }

        currentTurn = 'player';
    }

    return {
        setupGame,
        player,
        computer,
        playerAttack,
        computerAttack,
        getTurn: () => currentTurn,
        isGameOver: () => gameOver
    };
}
export  default GameController;