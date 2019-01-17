class Breeding {

    static getNewBreed(bird, parentA, parentB) {
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                this.onePosCrossover(bird, parentA, parentB);
                break;
            case 1:
                this.randomCrossover(bird, parentA, parentB);
                break;
        }
    }

    static randomCrossover(bird, parentA, parentB) {
        let wA = parentA.getWeights();
        let wB = parentB.getWeights();
        let wT = bird.getWeights();

        let ihWeightsA = wA[0];
        let hoWeightsA = wA[1];

        let ihWeightsB = wB[0];
        let hoWeightsB = wB[1];

        let ihWeightsT = wT[0];
        let hoWeightsT = wT[1];

        this.setRandomCrossedWeights(ihWeightsT, ihWeightsA, ihWeightsB);
        this.setRandomCrossedWeights(hoWeightsT, hoWeightsA, hoWeightsB);

    }

    static setRandomCrossedWeights(birdWeights, weightsA, weightsB) {
        for (let i = 0; i < weightsA.length; i++) {
            for (let j = 0; j < weightsA[i].length; j++) {
                let randomcross = Math.floor(Math.random(1) * 2);

                if (randomcross % 2 === 0) {
                    birdWeights[i][j] = weightsA[i][j];
                } else {
                    birdWeights[i][j] = weightsB[i][j];
                }
            }
        }
    }

    static onePosCrossover(bird, parentA, parentB) {
        let wA = parentA.getWeights();
        let wB = parentB.getWeights();
        let wT = bird.getWeights();

        let ihWeightsA = wA[0];
        let hoWeightsA = wA[1];

        let ihWeightsB = wB[0];
        let hoWeightsB = wB[1];

        let ihWeightsT = wT[0];
        let hoWeightsT = wT[1];

        this.setCrossedWeights(ihWeightsT, ihWeightsA, ihWeightsB);
        this.setCrossedWeights(hoWeightsT, hoWeightsA, hoWeightsB);
    }

    static setCrossedWeights(birdWeights, weightsA, weightsB) {
        let randCrossI = Math.floor(Math.random(0) * weightsA.length);
        let randCrossJ = Math.floor(Math.random(0) * weightsA[randCrossI].length);

        for (let i = 0; i < weightsA.length; i++) {
            for (let j = 0; j < weightsA[i].length; j++) {
                if (i < randCrossI && j < randCrossJ) {
                    birdWeights[i][j] = weightsA[i][j];
                } else {
                    birdWeights[i][j] = weightsB[i][j];
                }
            }
        }
    }

}