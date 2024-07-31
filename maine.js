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
function shoot() {
    
}