const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');


const img = new Image();
const virusImg = new Image();
const bulletImg = new Image();
const magazineImg = new Image();
const fuelImg = new Image();


let imgX = (canvas.width - 100) / 2;
let imgY = canvas.height - 100;

let bullets = [];
const bulletSpeed = 5;
const bulletWidth = 20;
const bulletHeight = 20;

let viruses = [];
let magazines = [];
let fuels = [];
let availableBullets = 0;
let availableFuel = 50;
const decreaseFuel=1;


const desiredWidth = 100;
const desiredHeight = 100;
let gameOver = false;
let score = 0;
const winScore = 1000;

bulletImg.src = 'img/bullet-svgrepo-com.png';
magazineImg.src = 'img/machine-gun-magazine-svgrepo-com.png';
fuelImg.src = 'img/fuel-svgrepo-com.png';

function fuel(){
    if(availableFuel === 0) {
        gameOver = true;
    }
}
setInterval(() => {
        if (availableFuel > 0) {
            availableFuel -= decreaseFuel;
        }
    }, 1000
);
function drawImage() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, imgX, imgY, desiredWidth, desiredHeight);
    for (const virus of viruses) {
        context.drawImage(virusImg, virus.x, virus.y, virus.width, virus.height);
    }
    for (const bullet of bullets) {
        context.drawImage(bulletImg, bullet.x, bullet.y, bulletWidth, bulletHeight);
    }
    for (const magazine of magazines) {
        context.drawImage(magazineImg, magazine.x, magazine.y, magazine.width, magazine.height);
    }
    for (const fuel of fuels) {
        context.drawImage(fuelImg, fuel.x, fuel.y, fuel.width, fuel.height);
    }

    //score
    context.font = '15px Arial';
    context.fillStyle = 'white';
    context.fillText('Score: ' + score, 10, 30);
    context.fillText('Bullets: ' + availableBullets, 10, 60);
    context.fillText('Fuel: ' + availableFuel, 10, 90);

    if (gameOver) {
        context.font = '48px Arial';
        context.fillStyle = score >= winScore ? 'green' : 'red';
        context.textAlign = 'center';
        context.fillText(score >= winScore ? 'You Win!' : 'Game Over', canvas.width / 2, canvas.height / 2);
    }
}


function fireBullet() {
    if (availableBullets > 0) {
        bullets.push({
            x: imgX + (desiredWidth / 2) - (bulletWidth / 2),
            y: imgY,
            width: bulletWidth,
            height: bulletHeight
        });
        availableBullets--;
    }
}

function updateBullets() {
    for (const bullet of bullets) {
        bullet.y -= bulletSpeed;
    }

    bullets = bullets.filter(bullet => bullet.y + bulletHeight > 0);
}

function checkCollisions() {
    for (const bullet of bullets) {
        for (const virus of viruses) {
            if (bullet.x < virus.x + virus.width &&
                bullet.x + bullet.width > virus.x &&
                bullet.y < virus.y + virus.height &&
                bullet.y + bullet.height > virus.y) {
                score += virus.score;
                viruses.splice(viruses.indexOf(virus), 1);
                bullets.splice(bullets.indexOf(bullet), 1);
                if (score >= winScore) {
                    gameOver = true;
                }
                break;
            }
        }
    }
}

function checkMagazineCollisions() {
    for (const magazine of magazines) {
        if (magazine.x < imgX + desiredWidth &&
            magazine.x + magazine.width > imgX &&
            magazine.y < imgY + desiredHeight &&
            magazine.y + magazine.height > imgY) {
            availableBullets += 100;
            magazines.splice(magazines.indexOf(magazine), 1);
            break;
        }
    }
}

function checkFuelCollisions() {
    for (const fuel of fuels) {
        if (fuel.x < imgX + desiredWidth &&
            fuel.x + fuel.width > imgX &&
            fuel.y < imgY + desiredHeight &&
            fuel.y + fuel.height > imgY) {
            availableFuel += 50; // increase fuel when collected
            fuels.splice(fuels.indexOf(fuel), 1);
            break;
        }
    }
}


function virusCrashesPlane() {
    for (const virus of viruses) {
        if (virus.x < imgX + desiredWidth &&
            virus.x + virus.width > imgX &&
            virus.y < imgY + desiredHeight &&
            virus.y + virus.height > imgY) {
            gameOver = true;
            break;
        }
    }
}

function randomVirus() {
    const x = Math.random() * (canvas.width - 50); //random position
    const speedY = 1 + Math.random(); //random speed
    const sizesAndScores = [
        { width: 30, height: 30, score: 5 },
        { width: 50, height: 50, score: 10 },
        { width: 70, height: 70, score: 20 }
    ]; //diff sizes & scores
    const selected = sizesAndScores[Math.floor(Math.random() * sizesAndScores.length)];

    viruses.push({ x: x,
                   y: 0,
                   width: selected.width,
                   height: selected.height,
                   speedY: speedY,
                   score: selected.score
    });
    const randomAppear = 1000 + Math.random() * 2000; // random viruses come down between 1 and 3 seconds.
    setTimeout(randomVirus, randomAppear);
}

function randomMagazine() {
    const x = Math.random() * (canvas.width - 50); // random position
    const speedY = 1 + Math.random(); // random speed
    const width = 50;
    const height = 50;

    magazines.push({
        x: x,
        y: 0,
        width: width,
        height: height,
        speedY: speedY
    });

    const magazineAppear = 15000; // bullet magazines come down every 15 seconds.
    if (!gameOver) {
        setTimeout(randomMagazine, magazineAppear);
    }
}

function randomFuel(){
    const x = Math.random() * (canvas.width - 50); // random position
    const speedY = 1 + Math.random(); // random speed
    const width = 50;
    const height = 50;
    fuels.push({
        x: x,
        y: 0,
        width: width,
        height: height,
        speedY: speedY
    });
    const fuelAppear = 20000; // fuel comes down every 20 seconds.
    if (!gameOver) {
        setTimeout(randomFuel, fuelAppear);
    }
}


img.src = 'img/airplane-svgrepo-com.png';
img.onload = function() {
    virusImg.src = 'img/virus-svgrepo-com.png';
};
virusImg.onload = function() {
    bulletImg.src = 'img/bullet-svgrepo-com.png';
};
bulletImg.onload = function() {
    magazineImg.src = 'img/machine-gun-magazine-svgrepo-com.png';
};
magazineImg.onload = function() {
    fuelImg.src = 'img/fuel-svgrepo-com.png';
}
fuelImg.onload = function() {
    drawImage();
    virusAnimation();
    randomVirus();
    randomMagazine();
    randomFuel();
}

document.addEventListener('keydown', function(event) {
    const step = 50; //amount of movement each time

    if (event.key === 'ArrowRight') {
        imgX += step;
        if (imgX > canvas.width - desiredWidth) imgX = canvas.width - desiredWidth; // boundries
    }
    if (event.key === 'ArrowLeft') {
        imgX -= step;
        if (imgX < 0) imgX = 0; // boundries
    }
    if (event.key === ' ') { // clicking space for shooting
        fireBullet();
    }

    drawImage();
});

function virusAnimation() {
    function update() {
        if (gameOver) return;

        for (const virus of viruses) {
            virus.y += virus.speedY;
        }
        for (const magazine of magazines) {
            magazine.y += magazine.speedY;
        }
        for (const fuel of fuels) {
            fuel.y += fuel.speedY;
        }

        fuel();
        virusCrashesPlane();
        checkMagazineCollisions();
        checkFuelCollisions(); // check for fuel collection
        updateBullets();
        checkCollisions();
        drawImage();

        if (!gameOver) {
            requestAnimationFrame(update);
        }
    }
    update();
}

