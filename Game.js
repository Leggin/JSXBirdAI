class Game {

    constructor() {
        this.animate = this.animate.bind(this);
        this.board = JXG.JSXGraph.initBoard('jxgbox', { boundingbox: [0, 0, constants.GAME_WIDTH, -constants.GAME_HEIGHT], keepaspectratio: true, axis: false });
        this.birdPop = new BirdPopulation(this.board, 600);
        this.obstacleCourse = new ObstacleCourse(this.board, 3, 20);
        this.animationPoint = this.board.create('point', [-1, 1]);
        this.generationCounter = 0;
        this.generationText = this.board.create('text', [48, -2, () => { return "Generation: ".concat(String(this.generationCounter)); }], { fontsize: 30, opacity: 0.7 });
        this.highscore = 0;
        this.highscoreText = this.board.create('text', [48, -4, () => { return "High Score: ".concat(String(this.highscore)); }], { fontsize: 20, opacity: 0.7 });

    }

    start() {
        this.animationPoint.moveAlong(this.animate, 0);
    }

    animate() {
        this.birdPop.letBirdsThink(this.obstacleCourse.obstacles);
        //update Bird
        this.birdPop.updateMotion();

        //update obstacles
        this.obstacleCourse.update();

        //mark collisions
        this.birdPop.markCollisions(this.obstacleCourse.obstacles);

        this.birdPop.removeCorpses();
        if (this.birdPop.allDead()) {
            this.obstacleCourse.reset();
            this.birdPop.newGeneration();
            this.generationCounter += 1;
        }
        this.updateHighscore();

        //return something so the animation never stops!
        return [-1, 1];
    }

    updateHighscore() {
        let tempScore = this.birdPop.getCurrentScore();
        if (this.highscore < tempScore) {
            this.highscore = tempScore;
        }
    }
}

let g = new Game();

g.start();