import { Ship } from "../index.js";
test('take a hit bih',()=>{
    expect(Ship(5).hit()).toBe(1);
});
test('titanic ahh',()=>{
    expect(Ship(5).isSunk()).toBe(false);
})