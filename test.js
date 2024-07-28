function moveShip(e){
    if(e.code == "ArrowLeft" && ship.x - shipMX >=0){
        ship.x -= shipMX; //move left 
    }
    else if(e.code == "ArrowRight" && ship.x + shipMX +ship.width <= board.width){
        ship.x += shipMX; //move right 
    }
}