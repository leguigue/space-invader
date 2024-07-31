export default  class MovingDirection {
    static right = new MovingDirection("right");
    static left = new MovingDirection("left");
    static downLeft = new MovingDirection("downLeft");
    static downRight = new MovingDirection("downRight");
    constructor(name) {
        this.name = name;
    }
    toString() {
        return this.name;
    }
}
