//board
let tilesize = 32;
let rows = 16;
let columns = 16;

let board;
let boardWidth = tilesize * columns;
let boardHeight = tilesize * columns;
let context;

//ship
let shipHeight = tilesize * 2;
let shipWidth = tilesize * 2;
let shipX = tilesize * columns/2 - tilesize;
let shipY = tilesize * rows - tilesize * 2;


let ship ={
    x: shipX,
    y: shipY,
    width: shipWidth,
    height: shipHeight
}

let shipImg;
let shipMX = tilesize; //ship moving speed







window.onload = function(){
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");
}



//load img
shipImg = new Image();
shipImg.src = "./Img/airplane-svgrepo-com.png";
shipImg.onload = function(){
    context.drawImage(shipImg , ship.x , ship.y , ship.width , ship.height);
}




requestAnimationFrame(update);
document.addEventListener("keydown", moveShip);


function update(){
    requestAnimationFrame(update);
}



//drawing the ship over and over again
context.drawImage(shipImg , ship.x , ship.y , ship.width , ship.height);





