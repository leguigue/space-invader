import Alien from "./Alien.js";
import MovingDirection from "./MovingDirection.js";
export default class AlienController {
    alienMap = [
        [1, 1, 2, 2, 2, 2, 1, 1],
        [2, 2, 1, 1, 1, 1, 2, 2],
        [2, 1, 3, 3, 3, 3, 1, 2],
        [2, 1, 3, 3, 3, 3, 1, 2],
        [2, 2, 1, 1, 1, 1, 2, 2],
        [1, 1, 2, 2, 2, 2, 1, 1],
    ];
    alienRows = [];
    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 1.5;
    defaultYVelocity = 1.5;
    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault;
    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;
    constructor(canvas, alienBulletController, shipBulletController) {
        this.canvas = canvas;
        this.alienBulletController = alienBulletController;
        this.shipBulletController = shipBulletController;
        this.alienDeathSound = new Audio('sounds/alien-death.mp3');
        this.alienDeathSound.volume = 0.5;
        this.createAliens();
    }
    draw(ctx) {
        this.decrementMoveDownTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection();
        this.drawAliens(ctx);
        this.resetMoveDownTimer();
        this.fireBullet();
    }
    collisionDetection() {
        this.alienRows.forEach((alienRow) => {
            alienRow.forEach((alien, alienIndex) => {
                if (this.shipBulletController.collideWith(alien)) {
                    this.alienDeathSound.currentTime = 0;
                    this.alienDeathSound.play();
                    alienRow.splice(alienIndex, 1);
                }
            });
        });
        this.alienRows = this.alienRows.filter((alienRow) => alienRow.length > 0);
    }
    fireBullet() {
        this.fireBulletTimer--;
        if (this.fireBulletTimer <= 0) {
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allAliens = this.alienRows.flat();
            if (allAliens.length > 0) {
                const alienIndex = Math.floor(Math.random() * allAliens.length);
                const alien = allAliens[alienIndex];
                this.alienBulletController.shoot(alien.x + alien.width / 2, alien.y + alien.height, -3);
            }
        }
    }
    resetMoveDownTimer() {
        if (this.moveDownTimer <= 0) {
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }
    decrementMoveDownTimer() {
        if (this.currentDirection === MovingDirection.downLeft || this.currentDirection === MovingDirection.downRight) {
            this.moveDownTimer--;
        }
    }
    updateVelocityAndDirection() {
        for (const alienRow of this.alienRows) {
            if (this.currentDirection === MovingDirection.right) {
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostAlien = alienRow[alienRow.length - 1];
                if (rightMostAlien.x + rightMostAlien.width >= this.canvas.width) {
                    this.currentDirection = MovingDirection.downLeft;
                    break;
                }
            } else if (this.currentDirection === MovingDirection.downLeft) {
                this.xVelocity = 0;
                this.yVelocity = this.defaultYVelocity;
                if (this.moveDown(MovingDirection.left)) {
                    break;
                }
            } else if (this.currentDirection === MovingDirection.left) {
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;
                const leftMostAlien = alienRow[0];
                if (leftMostAlien.x <= 0) {
                    this.currentDirection = MovingDirection.downRight;
                    break;
                }
            } else if (this.currentDirection === MovingDirection.downRight) {
                if (this.moveDown(MovingDirection.right)) {
                    break;
                }
            }
        }
    }
    moveDown(newDirection) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDownTimer <= 0) {
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }
    drawAliens(ctx) {
        this.alienRows.flat().forEach((alien) => {
            alien.move(this.xVelocity, this.yVelocity);
            alien.draw(ctx);
        });
    }
    createAliens() {
        this.alienMap.forEach((row, rowIndex) => {
            this.alienRows[rowIndex] = [];
            row.forEach((alienNumber, alienIndex) => {
                if (alienNumber > 0) {
                    this.alienRows[rowIndex].push(new Alien(alienIndex * 50, rowIndex * 35, alienNumber));
                }
            });
        });
    }
    collideWith(sprite) {
        return this.alienRows.flat().some((alien) => alien.collideWith(sprite));
    }
}