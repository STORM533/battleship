function Ship(size) {
    let hits = 0;
    function hit() { 
        if (hits<size){
            hits = hits +1;
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
export {Ship}