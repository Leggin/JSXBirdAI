class Bird {

    constructor(board, x, y) {
        this.x = x;
        this.y = y;
        this.width = 1; //this is needed for collision
        this.point = board.create('point', [() => { return this.x }, () => { return this.y }], { strokeColor: "#555555", fillColor: "#888888", withLabel: false, size: 7 });

        this.gravity = -0.078;
        this.lift = 1;
        this.velocity = 0;

        this.brain = new BrainNN(5, 4, 1);
        this.dead = false;
        this.score = 0;
    }

    addVerticalForce(force) {
        this.velocity += force;
    }

    update() {
        this.score += 1;
        this.addVerticalForce(this.gravity);
        this.velocity = Utilities.limit(this.velocity, 1);
        this.y += this.velocity;
    }

    up() {
        if ((this.y < this.topBound)) {
            return;
        }
        this.addVerticalForce(this.lift);
    }

    mutate(func) {
        this.brain.mutate(func);
    }

    think(closestObstacle) {
        if (closestObstacle != null) {

            //create the inputs to the neural network
            let inputs = [];

            //this y pos
            inputs[0] = Utilities.map(this.y, 0, constants.GAME_HEIGHT, 0, 1);
            //x pos of closest obstacle
            inputs[1] = Utilities.map(closestObstacle.x, 0, constants.GAME_WIDTH, 0, 1);
            //top of closest obstacle
            inputs[2] = Utilities.map(closestObstacle.top, 0, constants.GAME_HEIGHT, 0, 1);
            //bottom of closest obtacle
            inputs[3] = Utilities.map(closestObstacle.bot, 0, constants.GAME_HEIGHT, 0, 1);
            //velocity of bird
            inputs[4] = Utilities.map(this.velocity, -1, 1, 0, 1);
            //get the outputs from the network
            let action = this.brain.predict(inputs);
            //decide
            if (0.5 > action[0]) {
                return 0;
            } else return 1;
        }
    }

    getWeights() {
        return [this.brain.weights_ih.data, this.brain.weights_ho.data];
    }

    rebreed(parentA, parentB) {
        Breeding.getNewBreed(this, parentA, parentB);
    }

    die() {
        this.dead = true;
        this.x = -100;
    }

    performThinkingAction(prediction) {

        if (prediction == 1) {
            this.up();
        }
    }

}
