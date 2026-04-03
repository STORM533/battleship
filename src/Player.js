import { Gameboard } from "./gameBoard.js";
function Player(type = 'human') {
    const gameboard = Gameboard();
    function attack(opponent,coords) {
        opponent.gameboard.receiveAttack(coords);
    }
    function randomAttack(opponent) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
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