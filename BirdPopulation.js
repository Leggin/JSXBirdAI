class BirdPopulation {
    constructor(board, popSize) {
        this.population = [];
        this.populationSize = popSize;
        this.deadPopulation = [];
        this.board = board;
        this.generatePopulation();
    }

    generatePopulation() {
        while (this.population.length < this.populationSize) {
            this.population.push(new Bird(this.board, 1, Utilities.rand(constants.BIRD_Y_LOWER_SPAWN, constants.BIRD_Y_UPPER_SPAWN)));
        }
    }

    updateMotion() {
        this.population.forEach(bird => {
            bird.update();
        });
    }

    allDead() {
        for (let bird of this.population) {
            if (bird.dead === false) {
                return false;
            }
        }
        return true;
    }

    markCollisions(obstacles) {
        let closestObstacle = this.getClosestObstacle(obstacles);
        this.population.forEach(bird => {
            if (closestObstacle.collision(bird)) {
                bird.die();
            }
        });

    }

    letBirdsThink(obstacles) {
        let closestObstacle = this.getClosestObstacle(obstacles);
        this.population.forEach(bird => {
            let input = bird.think(closestObstacle);
            bird.performThinkingAction(input);
        });
    }

    getClosestObstacle(obstacles) {
        let sortedObstacles = obstacles.sort((a, b) =>
            a.x - b.x
        );
        return sortedObstacles[0];
    }

    removeCorpses() {
        let popTemp = [];
        this.population.forEach(bird => {
            if (bird.dead === false) {
                popTemp.push(bird);
            } else {
                this.deadPopulation.push(bird);
            }
        });
        this.population = [];
        this.population = popTemp;
    }

    getCurrentScore() {
        if (this.population.length > 0) {
            return this.population[0].score;
        }
        else {
            return 0;
        }
    }

    reviveAll() {
        this.deadPopulation.forEach(bird => {
            bird.dead = false;
        });
    }

    resetPosition() {
        this.deadPopulation.forEach(bird => {
            bird.x = 1
            bird.y = Utilities.rand(constants.BIRD_Y_LOWER_SPAWN, constants.BIRD_Y_UPPER_SPAWN);
        });
    }

    resetScore(population) {
        population.forEach(bird => {
            bird.score = 0;
        });
    }

    newGeneration() {
        this.reviveAll();
        this.resetPosition();
        let sortedPopulation = this.deadPopulation.sort((a, b) =>
            a.score - b.score
        );
        this.resetScore(sortedPopulation);

        // take top 10% of last generation an keep it in new 
        this.population = sortedPopulation.splice(0, Math.ceil(10 / sortedPopulation.length));

        // mutate the rest
        sortedPopulation.forEach(bird => {
            bird.brain.mutate(e => Math.random() * 2 - 1);
        });

        this.population = this.population.concat(sortedPopulation);
        this.deadPopulation = [];
    }
}