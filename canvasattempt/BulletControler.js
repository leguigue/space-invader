import Bullet from "./Bullet.js";
export default class BulletController {
    bullets = [];
    bulletCd = 0;
    constructor(canvas, bulletsLimits, bulletColor, soundEnabled) {
        this.canvas = canvas;
        this.bulletsLimits = bulletsLimits;
        this.bulletColor = bulletColor;
        this.soundEnabled = soundEnabled;
        this.shootSound = new Audio("./shoot.mp3")
        this.shootSound.volume = 0.5;
    }
    draw(ctx) {
        this.bullets = this.bullets.filter((bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height
        );
        this.bullets.forEach((bullet) => bullet.draw(ctx));
        if (this.bulletCd > 0) {
            this.bulletCd--;
        }
    }
    collideWith(sprite) {
        const shotHitIndex = this.bullets.findIndex((bullet) => bullet.collideWith(sprite)
        );
        if (shotHitIndex >= 0) {
            this.bullets.splice(shotHitIndex, 1);
            return true;
        }
        return false;
    }
    shoot(x, y, velocity, bulletCd = 0) {
        if (this.bulletCd <= 0 && this.bullets.length < this.bulletsLimits) {
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor);
            this.bullets.push(bullet);
            if (this.soundEnabled) {
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.bulletCd = bulletCd
        }
    }
}