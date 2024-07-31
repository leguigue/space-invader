import AlienController from "./AlienController.js";
import Ship from "./ship.js";
import BulletController from "./BulletControler.js";
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let ship;
let shipBulletController;
let alienBulletController;
let alienController;
let background;
let finito = false;
let champion = false;
let gameLoopInterval;
// Call init when the window loads
window.onload = init;
function init() {
    // Set up canvas
    canvas.width = 600;
    canvas.height = 600;
    // Initialize controllers
    shipBulletController = new BulletController(canvas, 10, "red", true);
    alienBulletController = new BulletController(canvas, 4, "white", true);
    // Initialize ship
    ship = new Ship(canvas, 3, shipBulletController);
    // Initialize alien controller
    alienController = new AlienController(canvas, alienBulletController, shipBulletController);
    // Load background image
    background = new Image();
    background.src = './images/blackground.png';
    background.onload = () => {
        console.log("Background image loaded successfully");
        // Start the game loop only after the background is loaded
        startGameLoop();
    };
    background.onerror = () => {
        console.error("Error loading background image");
    };
    // Reset game state
    finito = false;
    champion = false;
}
function startGameLoop() {
    // Start the game loop
    gameLoopInterval = setInterval(game, 1000 / 60);
}
function game() {
    checkGameFinito();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayFinito();
    if (!finito) {
        alienController.draw(ctx);
        ship.draw(ctx);
        shipBulletController.draw(ctx);
        alienBulletController.draw(ctx);
    }
}
function displayFinito() {
    if(finito){
        let text = champion ? "campeon del mundo" : "sombre loser";
        ctx.fillStyle = "white";    
        // Ajuster la taille de la police en fonction du texte
        let fontSize = champion ? 50 : 70;
        ctx.font = fontSize + "px Arial";
        
        // Centrer le texte horizontalement
        let textWidth = ctx.measureText(text).width;
        let x = (canvas.width - textWidth) / 2;
        
        ctx.fillText(text, x, canvas.height / 2);
    }
}
function checkGameFinito() {
    if (finito) {
        return;
    }
    if (alienBulletController.collideWith(ship)) {
        finito = true;
    }
    if(alienController.collideWith(ship)){
        finito = true;
    }
    if(alienController.alienRows.length === 0){
        champion = true;
        finito = true;
    }
}
function stopGameLoop() {
    if (gameLoopInterval) {
        clearInterval(gameLoopInterval);
    }
}
