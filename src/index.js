function Ship(size) {
    let hits = 0;
    function hit() { 
        if (hits<size){
            hits = hits + 1;
        }
        return hits;
    }
    function isSunk() {
        return hits === size;
    }
    return{
        hit,
        isSunk
    }
}
function Gameboard() {
    let ships = [];
    let missedAttacks = [];
    let attackedCoords = [];
    function placeShip(ship, positions) {
        ships.push({
            ship: ship,
            positions: positions
        });
    }
    function receiveAttack(coords) {
    if (attackedCoords.some(c => c[0] === coords[0] && c[1] === coords[1])) {
        return;
    }
    attackedCoords.push(coords);
        for (let obj of ships) {
            for (let pos of obj.positions) {
                if (pos[0] === coords[0] && pos[1] === coords[1]) {
                    obj.ship.hit();
                    return;
                }
            }
        }
        missedAttacks.push(coords);
    }
    function allShipsSunk() {
        return ships.every(obj => obj.ship.isSunk());
    }
    return {
        placeShip,
        receiveAttack,
        allShipsSunk,
        missedAttacks
    };
}
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
export {Ship,Gameboard,Player}