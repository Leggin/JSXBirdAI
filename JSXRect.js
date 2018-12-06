class JSXRect {
    constructor(board, x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.topLeft = board.create('point', [() => { return this.x }, () => { return this.y }], { visible: false });
        this.topRight = board.create('point', [() => { return this.x + this.w }, () => { return this.y }], { visible: false });
        this.botRight = board.create('point', [() => { return this.x + this.w }, () => { return this.y - this.h }], { visible: false });
        this.botLeft = board.create('point', [() => { return this.x }, () => { return this.y - this.h }], { visible: false });
        this.polygon = board.create('polygon', [this.topLeft, this.topRight, this.botRight, this.botLeft], { borders: { strokeColor: "#aaaaaa", highlightStrokeColor: "#bbbbbb", strokeOpacity: 0.6 }, highlightFillColor: "#bbbbbb", fillColor: "#aaaaaa", strokeOpacity: 0 });
    }

    setX(newX) {
        this.x = newX;
    }

    setY(newY) {
        this.y = newY;
    }

    setHeight(newHeight) {
        this.h = newHeight;
    }
}