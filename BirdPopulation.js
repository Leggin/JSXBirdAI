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

    anyoneDead() {
        for (let bird of this.population) {
            if (bird.dead === true) {
                return true;
            }
        }
        return false;
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

    getRandomBird(pop) {
        let rand = Math.floor(Math.random() * pop.length);
        return pop[rand];
    }

    drawFromTwoPopulations(popA, popB) {
        if (Math.random() < 0.5) {
            return this.getRandomBird(popA);
        }
        else {
            return this.getRandomBird(popA);
        }
    }

    // rebreeds a random amount of times the birds from 97% population, this can rebreed the same bird multiple times
    breed(popA, popB) {
        let newPopB = [];
        for (let i = 0; i < popB.length; i++) {
            let parentA = this.drawFromTwoPopulations(popA, popB); // get random parent from any population 
            let parentB = this.drawFromTwoPopulations(popA, popB); //  again

            let breedBird = popB[i];   // get random bird from remaining 97% and rebreed it
            breedBird.rebreed(parentA, parentB);
            newPopB.push(breedBird);
        }
        popB = [];
        return newPopB;
    }

    newGeneration() {
        this.reviveAll();
        this.resetPosition();
        let sortedPopulation = this.deadPopulation.sort((a, b) =>
            b.score - a.score
        );
        this.resetScore(sortedPopulation);

        // take top 3% of last generation and keep it in new one
        this.population = sortedPopulation.splice(0, Math.ceil(sortedPopulation.length * 0.03));

        let newBreed = this.breed(this.population, sortedPopulation);


        // mutate now randomly with 8% chance (arbitrary value but not to big and not to small)
        newBreed.forEach(bird => {
            let r = Math.random();
            if (r < 0.08) {
                //bird.mutate(e => Math.random() * 2 - 1);
            }
        });

        this.population = this.population.concat(newBreed);

        this.deadPopulation = [];
    }
}