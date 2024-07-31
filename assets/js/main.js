const container = document.getElementById('gameContainer')
const ship = 1
const blackAlien = 2
const blueAlien = 3
const redAlien = 4
const voidcell = 0
const plate = 5
const shipBullet=   6
const aliensBullet=7
let score = 0
let edge = false
let game = false
let alienDirection = 1
let shipPositionX = 8;
let shipPositionY = 10
let shipLife = 3
let blackAlienLife = 1
let blueAlienLife = 1
let redAlienLife = 2
let plateLife = 15
let gameTab = [
    [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,],// alien
    [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,],// alien
    [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,],// alien 
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,],// alien
    [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,],// alien
    [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,],// alien
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],//vide
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],//vide
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],//vide
    [0, 0, 5, 5, 0, 0, 5, 5, 0, 5, 5, 0, 0, 5, 5, 0, 0,], // block protection
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,], //ship
]
function shipMovement(direction) { // se deplace seulement en x et +1 ou -1
    gameTab[10][shipPositionX] = 9;
    shipPositionX += direction;
    if (shipPositionX < 0) shipPositionX = 0;
    if (shipPositionX > gameTab[10].length - 1) shipPositionX = gameTab[10].length - 1;
    gameTab[10][shipPositionX] = ship;
    createTab(gameTab);
}
function alienMovement() {   // se deplacent de X+1 en X+1 jusqu'a atteindre le bord du tableau, quand une valeur autre que 1 et 0 touche le bord du tableau alors Y+1, quand Y+1 alors
    //se deplacent de X-1 en X-1 jussqu'au bord du tableau quand une valeur touche bord alors Y+1 puis X+1 en X+1
    // mettre 1 sec entre chaque deplacement
    for (let i = 0; i < gameTab.length; i++) {
        for (let j = 0; j < gameTab[i].length; j++) {
            if (gameTab[i][j] === blackAlien || gameTab[i][j] === blueAlien || gameTab[i][j] === redAlien) {
                if ((j + alienDirection < 0) || (j + alienDirection >= gameTab[i].length)) {
                    edge = true;
                }
            }
        }
    }
    if (edge) {
        alienDirection *= -1;
        for (let i = gameTab.length - 2; i >= 0; i--) {
            for (let j = 0; j < gameTab[i].length; j++) {
                if (gameTab[i][j] === blackAlien || gameTab[i][j] === blueAlien || gameTab[i][j] === redAlien) {
                    if (gameTab[i + 1][j] === voidcell) {
                        gameTab[i + 1][j] = gameTab[i][j];
                        gameTab[i][j] = voidcell;
                    }
                }
            }
        }
    } else {
        for (let i = 0; i < gameTab.length; i++) {
            if (alienDirection > 0) {
                for (let j = gameTab[i].length - 1; j >= 0; j--) {
                    if (gameTab[i][j] === blackAlien || gameTab[i][j] === blueAlien || gameTab[i][j] === redAlien) {
                        if (gameTab[i][j + alienDirection] === voidcell) {
                            gameTab[i][j + alienDirection] = gameTab[i][j];
                            gameTab[i][j] = voidcell;
                        }
                    }
                }
            } else {
                for (let j = 0; j < gameTab[i].length; j++) {
                    if (gameTab[i][j] === blackAlien || gameTab[i][j] === blueAlien || gameTab[i][j] === redAlien) {
                        if (gameTab[i][j + alienDirection] === voidcell) {
                            gameTab[i][j + alienDirection] = gameTab[i][j];
                            gameTab[i][j] = voidcell;
                        }
                    }
                }
            }
        }
    }
}
function gameOver() {
    if (shipLife === 0) {
        return game = false
    }
    else if (alienPosition === shipPositionX) {
        return game = false
    }
}
function shoot() {
    let bulletPositionY = shipPositionY;
    let bulletPositionX = shipPositionX;
    let bulletInterval = setInterval(() => {
        if (bulletPositionY >= 0 && gameTab[bulletPositionY][bulletPositionX] !== voidcell) {
            gameTab[bulletPositionY][bulletPositionX] = voidcell;
            bulletPositionY--;
            if (gameTab[bulletPositionY][bulletPositionX] === blackAlien) {
                blackAlienLife--;
                score += 10;
                gameTab[bulletPositionY][bulletPositionX] = voidcell;
                clearInterval(bulletInterval);
            } else if (gameTab[bulletPositionY][bulletPositionX] === blueAlien) {
                blueAlienLife--;
                score += 10;
                gameTab[bulletPositionY][bulletPositionX] = voidcell;
                clearInterval(bulletInterval);
            } else if (gameTab[bulletPositionY][bulletPositionX] === redAlien) {
                redAlienLife--;
                if (redAlienLife === 0) {
                    score += 20
                }
                gameTab[bulletPositionY][bulletPositionX] = voidcell;
                clearInterval(bulletInterval);
            }
            else if (gameTab[bulletPositionY][bulletPositionX] === plate) {
                plateLife--;
                clearInterval(bulletInterval);
            }
            else {
                gameTab[bulletPositionY][bulletPositionX] = shipBullet;
                createTab(gameTab);
                clearInterval(bulletInterval);
            }
        } 500;
    });
}
let aliens = [];
for (let i = 0; i < gameTab.length; i++) {
    for (let j = 0; j < gameTab[i].length; j++) {
        if (gameTab[i][j] === blackAlien || gameTab[i][j] === blueAlien || gameTab[i][j] === redAlien) {
            aliens.push([i, j]);
        }
    }
}
if (aliens.length > 0) {
    let aliensBullet = aliens.sort(() => 0.5 - Math.random()).slice(0, 2);
    aliensBullet.forEach(([y, x]) => {
        let bulletPositionY = y;
        let bulletPositionX = x;
        let bulletInterval = setInterval(() => {
            if (bulletPositionY < gameTab.length - 1) {
                bulletPositionY++;
                if (gameTab[bulletPositionY][bulletPositionX] === ship) {
                    shipLife--;
                    clearInterval(bulletInterval);
                    if (shipLife === 0) {
                        game = false;
                    }
                    if (aliensBullet===blackAlien||aliensBullet===blueAlien||aliensBullet===redAlien) {
                        if (aliensBullet[bulletPositionY][bulletPositionX] === blackAlien) {
                            gameTab[i][j] = blackAlien;
                            clearInterval(bulletInterval);
                        } else if (aliensBullet[bulletPositionY][bulletPositionX] === blueAlien) {
                            aliensBullet[bulletPositionY][bulletPositionX] = blueAlien;
                            clearInterval(bulletInterval);
                        } else if (aliensBullet[bulletPositionY][bulletPositionX] === redAlien) {
                        
                    }
                }
                gameTab[bulletPositionY][bulletPositionX] = voidcell;
                createTab(gameTab);
        } else {
            clearInterval(bulletInterval);
        }
        } 1500});
});
}
if (game) {
    setTimeout(aliensBullet, 1500);
}
document.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        shoot(); // Call the shoot function when spacebar is pressed
    }
});
function createTab(tab) {
    container.innerHTML = '';
    tab.forEach((row, rowIndex) => {
        let rowEl = document.createElement('div');
        rowEl.classList.add('row');
        row.forEach((cell, columnIndex) => {
            let cellEl = document.createElement('div');
            cellEl.classList.add('cell');
            switch (cell) {
                case ship:
                    cellEl.classList.add('ship');
                    break;
                case blackAlien:
                    cellEl.classList.add('black-alien');
                    break;
                case blueAlien:
                    cellEl.classList.add('blue-alien');
                    break;
                case redAlien:
                    cellEl.classList.add('red-alien');
                    break;
                case plate:
                    cellEl.classList.add('plate');
                    break;
            }
            rowEl.appendChild(cellEl);
        });
        container.appendChild(rowEl);
    });
}
function startGame() {
    shipLife = 3
    blackAlienLife = 1
    blueAlienLife = 1
    redAlienLife = 2
    plateLife = 15
    game = true
    score = 0;
    //updateScore();
    gameTab = [
        [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,],// alien
        [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,],// alien
        [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0,],// alien faire 11 alien pour pouvoir mettre le vaiseau au milieu et ne pas doubler la taille des hitbox  
        [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,],// alien
        [0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,],// alien
        [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,],// alien
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],//vide
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],//vide
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],//vide
        [0, 0, 5, 5, 0, 0, 5, 5, 0, 5, 5, 0, 0, 5, 5, 0, 0,], // block protection
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,],// ship
    ];
    createTab(gameTab);
    alienMovement();
    shoot();
    // scoreInterval = setInterval(() => { // incrémenter le score
    // score++;
    // updateScore();
    // }, 1000); // Incrémente le score chaque seconde
}
/*
function updateScore() {
score.innerHTML= updateScore()
    if(redAlienLife){
    }
}
*/
function checkCollisions() { // vérifier les collisions

}
//event listener du jeu
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowLeft':
        case 'q':
        case 'Q':
            shipMovement(-1);
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            shipMovement(1);
            break;
        case 'space':
            shoot();
            break;
    }
});
startBtn.addEventListener('click', () => {
    startBtn.classList.add('hidden');
    startGame();
});
// gestion des menus
const start = document.getElementById('startBtn')
const optionBtn = document.getElementById('optionBtn');
const optionsMenu = document.getElementById('options-menu');
const soundToggle = document.getElementById('mute');
const keybindSwitch = document.getElementById('keybind-switch');
const showCredits = document.getElementById('show-credits');
const closeOptions = document.getElementById('close-options');
const volumeSlider = document.getElementById('volume-slider')
const sonResult = new Audio('./assets/son/');
let isMuted = false;
optionBtn.addEventListener('click', () => {
    optionsMenu.classList.remove('hidden');
});
closeOptions.addEventListener('click', () => {
    optionsMenu.classList.add('hidden');
});
keybindSwitch.addEventListener('click', () => {
    return ('Keybind switching not implemented yet');
});
soundToggle.addEventListener('click', () => {
    isMuted = !isMuted;
    sonResult.muted = isMuted;
    soundToggle.textContent = isMuted ? 'Sound off' : 'Sound on';
});
volumeSlider.addEventListener('input', (event) => {
    const volume = event.target.value;
    sonResult.volume = volume / 100;
});
/*
let highscore =  []
if (localStorage.getItem("highscore")) {
    tasks = localStorage.getItem("tasks")
    tasks = JSON.parse(tasks)
}
console.log(JSON.parse(localStorage.getItem("task")));
let todo = document.querySelector(`#ToDoListContainer`);
function createArticle(task= null,) {
    if (task == null) {
        task = {
            title: document.getElementById('title').value,
            descritpion: document.getElementById('description').value,
        }
        tasks.push(task)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
        
    let article = document.createElement("article");
    let paraOne = document.createElement("p");
    paraOne.innerHTML = task.title
    article.appendChild(paraOne);
    let paraTwo = document.createElement("p");
    paraTwo.innerHTML = task.descritpion
    article.appendChild(paraTwo);
    let div = document.createElement('div');
    article.appendChild(div);
    if(onclick="createArticle()"===true){
        title="";
        descritpion=""
    }
    let btnSupprimer = document.createElement('button');
    btnSupprimer.style.backgroundColor = "teal";
    btnSupprimer.innerHTML = "Supprimer";
    btnSupprimer.classList.add("truc");
    btnSupprimer.addEventListener('click', function () {
        article.remove();
        let index=tasks.indexOf(task)
        if(index!==-1){
            tasks.splice(index,1)
            localStorage.setItem("tasks",JSON.stringify(tasks))
        }
    });
    div.appendChild(btnSupprimer);
    todo.appendChild(article);
    document.getElementById('description').value = ""
        document.getElementById('title').value = ""
}
let input=document.getElementById('description')
function displayTasks() {
    console.log(tasks);
    tasks.forEach(el => {
        createArticle(el)
    });
}
displayTasks()
*/