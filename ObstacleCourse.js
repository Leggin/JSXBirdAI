const OBSTACLE_WIDTH = 5;
const OBSTACLE_HEIGHT = 30;
const OBSTACLE_SPACE = { lower: 8, upper: 15 };

class ObstacleCourse {
    constructor(board, obstacleCount, obstacleDistance) {
        this.board = board;
        this.obstacleCount = obstacleCount;
        this.obstacleDistance = obstacleDistance;
        this.obstacles = [];
        this.createObstacles();
        this.reset();
    }

    update() {
        this.obstacles.forEach(obstacle => {
            obstacle.update();
        });
    }

    createObstacles() {
        for (let i = 0; i < this.obstacleCount; i++) {
            this.obstacles.push(new Obstacle(this.board, 0, 0, OBSTACLE_WIDTH, OBSTACLE_HEIGHT, OBSTACLE_SPACE));
        }
    }

    reset() {
        for (let i = 0; i < this.obstacles.length; i++) {
            let xpos = (i + 1) * this.obstacleDistance;
            this.obstacles[i].setX(xpos);
        }
    }
}