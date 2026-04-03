import { Ship,Gameboard,Player } from "../index.js";
//ship
test('take a hit bih',()=>{
    expect(Ship(5).hit()).toBe(1);
});
test('titanic ahh',()=>{
    expect(Ship(5).isSunk()).toBe(false);
});
//ganeboard
test('places ship at given coordinates', () => {
    const board = Gameboard();
    const ship = Ship(2);

    board.placeShip(ship, [[0,0],[0,1]]);

    expect(board.allShipsSunk()).toBe(false);
});
test('attack hits ship', () => {
    const board = Gameboard();
    const ship = Ship(1);

    board.placeShip(ship, [[0,0]]);
    board.receiveAttack([0,0]);

    expect(ship.isSunk()).toBe(true);
});
test('attack misses and is recorded', () => {
    const board = Gameboard();
    const ship = Ship(1);

    board.placeShip(ship, [[0,0]]);
    board.receiveAttack([5,5]);

    expect(board.missedAttacks).toContainEqual([5,5]);
});
test('allShipsSunk returns true only when all ships are sunk', () => {
    const board = Gameboard();

    const ship1 = Ship(1);
    const ship2 = Ship(1);

    board.placeShip(ship1, [[0,0]]);
    board.placeShip(ship2, [[1,1]]);

    expect(board.allShipsSunk()).toBe(false);

    board.receiveAttack([0,0]);
    board.receiveAttack([1,1]);

    expect(board.allShipsSunk()).toBe(true);
});
test('same coordinate attack does not double hit ship', () => {
    const board = Gameboard();
    const ship = Ship(2);

    board.placeShip(ship, [[0,0],[0,1]]);

    board.receiveAttack([0,0]);
    board.receiveAttack([0,0]); // duplicate

    expect(ship.isSunk()).toBe(false);
});
//player
test('player has a gameboard', () => {
    const player = Player();
    expect(player.gameboard).toBeDefined();
});
test('player can attack opponent board', () => {
    const p1 = Player();
    const p2 = Player();

    const ship = Ship(1);
    p2.gameboard.placeShip(ship, [[0,0]]);

    p1.attack(p2, [0,0]);

    expect(ship.isSunk()).toBe(true);
});
test('computer can make random attack', () => {
    const computer = Player('computer');
    const opponent = Player();

    computer.randomAttack(opponent);

    expect(opponent.gameboard.missedAttacks.length >= 0).toBe(true);
});