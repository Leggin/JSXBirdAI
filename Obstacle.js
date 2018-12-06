
class Obstacle {
    constructor(board, x, y, w, h, spaceRange) {
        this.x = x;
        [this.top, this.bot] = this.getTopBot(h, spaceRange);
        this.height = h;
        this.width = w;
        this.dead = false;
        this.spaceRange = spaceRange;
        this.topRect = new JSXRect(board, x, y, w, -this.top);
        this.botRect = new JSXRect(board, x, this.bot, w, h + this.bot);
    }

    setX(x) {
        this.x = x;
        this.topRect.setX(x);
        this.botRect.setX(x);
    }

    update() {
        if (this.x >= -this.width) {
            this.x = this.x - 0.2;
            this.setX(this.x);
        }
        else {
            //obstacle is dead, reset values
            this.x = constants.GAME_WIDTH;
            [this.top, this.bot] = this.getTopBot(this.height, this.spaceRange);

            this.setX(constants.GAME_WIDTH);

            this.topRect.setHeight(-this.top);
            this.botRect.setHeight(this.height + this.bot);
            this.botRect.setY(this.bot);
        }
    }

    collision(bird) {
        if (bird.x < this.x - bird.width / 2 || bird.x > this.x + this.width + bird.width / 2) {
            return false;
        }
        else {
            if (bird.y - bird.width / 2 > this.bot && bird.y + bird.width / 2 < this.top) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    getTopBot(height, spaceRange) {
        let space = Utilities.rand(spaceRange.lower, spaceRange.upper);
        let top = Utilities.rand(2, height - space - 2);
        let bot = top + space;
        return [-top, -bot];
    }
}

