// gameController.js
import{Player}from "./Player.js";
import{Ship}from "./Ship.js";
import { Gameboard } from "./gameBoard.js";
function GameController() {
    let player = Player('human');
    let computer = Player('computer');
    let currentTurn = 'player';
    let gameOver = false;
    const SHIP_SIZES = [5,4,3,3,2];
    function getRandomCoords(size) {
        const isHorizontal = Math.random() > 0.5;
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        let coords = [];
        for (let i = 0; i < size; i++) {
            if (isHorizontal) {
                coords.push([x, y + i]);
            } else {
                coords.push([x + i, y]);
            }
        }
        return coords;
    }
    function isValidPlacement(board, coords) {
        return coords.every(([x, y]) => {
        // bounds
        if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;
        // check surrounding cells (including itself)
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                let nx = x + dx;
                let ny = y + dy;

                if (nx < 0 || nx >= 10 || ny < 0 || ny >= 10) continue;

                if (board.ships.some(obj =>
                    obj.positions.some(p => p[0] === nx && p[1] === ny)
                )) {
                    return false;
                }
            }
        }
        return true;
    });
}
    function placeShipsRandomly(player) {
        player.gameboard = Gameboard();// reset board
        let attempts = 0;
        for (let size of SHIP_SIZES) {
            let placed = false;
            while (!placed&&attempts<100) {
                let coords = getRandomCoords(size);
                if (isValidPlacement(player.gameboard, coords)) {
                    player.gameboard.placeShip(Ship(size), coords);
                    placed = true;
                }
            }
            if (!placed) {
                throw new Error("Failed to place ship after 100 attempts");
            }
        }
    }
    function randomizeShips() {
        currentTurn = 'player';
        gameOver = false;
        placeShipsRandomly(player);
        placeShipsRandomly(computer);
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
        player,
        computer,
        playerAttack,
        computerAttack,
        randomizeShips,
        getTurn: () => currentTurn,
        isGameOver: () => gameOver
    };
}
export  { GameController};