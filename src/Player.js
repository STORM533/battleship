import { Gameboard } from "./gameBoard.js";
function Player(type = 'human') {
    const gameboard = Gameboard();
    function attack(opponent,coords) {
        opponent.gameboard.receiveAttack(coords);
    }
    function randomAttack(opponent) {
        let x, y;
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (
            opponent.gameboard.attackedCoords?.some(c => c[0] === x && c[1] === y)
        );
        opponent.gameboard.receiveAttack([x, y]);
    }
    return {
        type,
        attack,
        gameboard,
        randomAttack
    };
}
export{Player}